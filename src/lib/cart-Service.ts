import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { ICartItem } from "../definitions/ProductTypes";
import { useRecoilState } from "recoil";
import { cartState } from "../atmos";
import { saveCartToLocalStorage } from "../localStorage";

export const addToCart = async (
  studentId: string,
  product: ICartItem
): Promise<void> => {
  try {
    const cartRef = doc(
      collection(db, `students/${studentId}/cart`),
      product.id
    );
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      await updateDoc(cartRef, {
        amount: cartSnap.data().amount + 1,
      });
    } else {
      await setDoc(cartRef, {
        id: product.id,
        img_url: product.img_url,
        name: product.name,
        price: product.price,
        type: product.type,
        product_url: product.product_url || "",
        amount: 1,
      });
    }
  } catch (error) {
    console.error("Error adding product to cart: ", error);
  }
};

export const updateCartItemAmount = async (
  student_id: string,
  item_id: string,
  amount: number
): Promise<void> => {
  try {
    const cartRef = doc(collection(db, `students/${student_id}/cart`), item_id);
    await setDoc(cartRef, { amount }, { merge: true });
  } catch (error) {
    console.error("Error updating cart item amount: ", error);
  }
};

export const removeCartItem = async (
  student_id: string,
  item_id: string
): Promise<void> => {
  try {
    const cartRef = doc(collection(db, `students/${student_id}/cart`), item_id);
    await deleteDoc(cartRef);
  } catch (error) {
    console.error("Error removing cart item: ", error);
  }
};

export const handleAddToCart = (user_id: string, item: ICartItem) => {
  const [data, setData] = useRecoilState(cartState);

  setData((prevCart) => [...prevCart, item]);
  saveCartToLocalStorage(data);
  try {
    addToCart(user_id, item);
    alert("장바구니에 담겼습니다.");
  } catch (error) {
    console.error(error);
    alert("장바구니에 담는 데 실패했습니다.");
  }
};
