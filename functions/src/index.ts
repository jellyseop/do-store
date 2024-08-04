import { onRequest } from "firebase-functions/v2/https";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { FieldValue, getFirestore, Timestamp } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";

interface DoRecord {
  amount: number;
  detail: string;
  createBy: string;
  createAt: Timestamp;
  type: string;
}

interface DoAccount {
  balance: number;
  record: DoRecord[];
}

interface Product {
  id: string;
  type: number;
  name: string;
  price: number;
  img_url: string;
  product_url: string;
  totalOrders: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  tags: string[];
}

interface CartItem
  extends Pick<
    Product,
    "id" | "name" | "price" | "img_url" | "product_url" | "type"
  > {
  amount: number;
}

interface Cart {
  items: CartItem[];
}

export interface Order {
  student_id: string;
  nameKo: string;
  nameEn: string;
  product_id: string;
  type: number;
  desc?: string;
  img_url: string;
  name: string;
  price: number;
  amount: number;
  status: number;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}

initializeApp({
  credential: applicationDefault(),
});

const db = getFirestore();
const auth = getAuth();

export const orderFunction = onRequest(async (req, res): Promise<any> => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];

  if (!idToken) {
    return res
      .status(401)
      .send({ ok: false, error: "Authorization token missing" });
  }

  try {
    const user = await auth.verifyIdToken(idToken);
    if (!user) {
      return res.status(401).send({ ok: false, error: "unauthenticated." });
    }

    const studentRef = db.collection("students").doc(user.uid);

    const studentSnapshot = await studentRef.get();

    if (!studentSnapshot.exists) {
      return res.status(404).send({ ok: false, error: "unauthorized." });
    }
    const student = studentSnapshot.data() as {
      nameKo: string;
      nameEn: string;
    };

    const productRef = db.collection("products");
    const cartRef = studentRef.collection("cart");
    const cartSnapshot = await cartRef.get();
    if (cartSnapshot.docs.length === 0) {
      return res
        .status(400)
        .send({ ok: false, error: "장바구니에 상품이 없습니다." });
    }

    let cartData: CartItem[] = [];
    let totalPrice = 0;

    for await (const cart of cartSnapshot.docs) {
      const snapshot = await productRef.doc(cart.id).get();
      const product = snapshot.data() as Product;
      if (cart.data().amount <= 0) {
        return res
          .status(400)
          .send({ ok: false, error: "상품 개수가 유효하지 않습니다." });
      }
      cartData.push({
        id: cart.data().id,
        name: product.name,
        price: product.price,
        img_url: product.img_url,
        product_url: product.product_url,
        type: product.type,
        amount: cart.data().amount,
      });
      totalPrice += product.price * cart.data().amount;
    }

    const doAccountRef = db.collection("do").doc(user.uid);
    const doAccountSnapshot = await doAccountRef.get();

    if (!doAccountSnapshot.exists) {
      return res
        .status(404)
        .send({ ok: false, error: "두머니 계좌가 존재하지 않습니다." });
    }

    const doAccount = doAccountSnapshot.data() as DoAccount;

    if (totalPrice > doAccount.balance) {
      return res.status(403).send({ ok: false, error: "잔액 부족" });
    }

    db.runTransaction(async (transaction) => {
      for (const item of cartData) {
        const orderRef = db.collection("orders").doc();
        const productRef = db.collection("products").doc(item.id);
        const recordRef = doAccountRef.collection("record").doc();

        transaction.set(orderRef, {
          student_id: user.uid,
          nameKo: student.nameKo,
          nameEn: student.nameEn,
          product_id: item.id,
          type: item.type,
          desc: item.product_url,
          img_url: item.img_url,
          name: item.name,
          price: item.price,
          amount: item.amount,
          status: 1,
          createdAt: Timestamp.now(),
          updatedAt: Timestamp.now(),
        });

        transaction.update(productRef, {
          totalOrder: FieldValue.increment(1),
        });

        transaction.update(doAccountRef, {
          balance: FieldValue.increment(-(item.price * item.amount)),
        });
        transaction.set(recordRef, {
          amount: -(item.price * item.amount),
          detail: "order",
          createdBy: "admin",
          createdAt: Timestamp.now(),
          type: "do-store",
        });

        transaction.delete(cartRef.doc(item.id));
      }
    });

    return res.status(200).send({
      ok: true,
    });
  } catch (error: any) {
    return res
      .status(500)
      .send({ ok: false, error: error.message || "An error occurred" });
  }
});
