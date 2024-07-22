import { collection } from "firebase/firestore";
import { onRequest } from "firebase-functions/v2/https";
import { initializeApp, applicationDefault } from "firebase-admin/app";
import { FieldValue, getFirestore, Timestamp } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { log } from "firebase-functions/logger";

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

export const helloWorld = onRequest(async (req, res): Promise<any> => {
  const idToken = req.headers.authorization?.split("Bearer ")[1];
  console.log(idToken);

  if (!idToken) {
    res.status(401).send("Authorization token missing");
    return {
      ok: false,
      error: "Authorization token missing",
    };
  }

  try {
    const user = await auth.verifyIdToken(idToken);

    if (!user) {
      res.status(402).send("user not authorization");
      return {
        ok: false,
        error: "User not authorization",
      };
    }

    const studentSnapshot = await db.collection("students").doc(user.uid).get();

    // student collection check if the user not exists in the student collection

    if (!studentSnapshot.exists) {
      res.status(401).send("User does not exist");
      return { ok: false, error: "User does not exist" };
    }

    const student = studentSnapshot.data() as {
      nameKo: string;
      nameEn: string;
    };

    const doAccountSnapshot = await db.collection("do").doc(user.uid).get();

    if (!doAccountSnapshot.exists) {
      return res.status(403).send({ ok: false, error: "잔액 부족" }); //문구 수정 요망!
    }

    const doAccount = doAccountSnapshot.data() as DoAccount;

    const { cartData } = req.body as { cartData: CartItem[] };
    let totalPrice = 0;
    for (const item of cartData) {
      if (item.amount <= 0) {
        return res.status(400).send({ ok: false, error: "Invalid amount" });
      }
      totalPrice += item.price * item.amount;
    }

    console.log("total price: ", totalPrice);
    console.log("total balance: ", doAccount.balance);

    if (totalPrice > doAccount.balance) {
      return res.status(401).send({ ok: false, error: "잔액 부족" }); //문구 수정 요��!
    }

    const balanceRef = db.collection("do").doc(user.uid);

    db.runTransaction(async (transaction) => {
      for (const item of cartData) {
        const productRef = db.collection("products").doc(item.id);
        const recordRef = balanceRef.collection("record").doc();
        const orderRef = db.collection("orders").doc();

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

        transaction.update(balanceRef, {
          balance: FieldValue.increment(-(item.price * item.amount)),
        });
        transaction.set(recordRef, {
          amount: -(item.price * item.amount),
          detail: "order",
          createdBy: "do-store",
          createdAt: Timestamp.now(),
          type: "do-store",
        });
      }
    });

    return res.status(200).send({
      ok: true,
    });
  } catch (error: any) {
    return {
      ok: false,
      error: error.message || "An error occurred",
    };
  }
});
