import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../firebase";
import { ICartItem } from "../definitions/ProductTypes";

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
      console.log("Product amount updated in cart successfully");
    } else {
      await setDoc(cartRef, {
        id: product.id,
        img_url: product.img_url,
        name: product.name,
        price: product.price,
        amount: 1,
      });
      console.log("Product added to cart successfully");
    }
  } catch (error) {
    console.error("Error adding product to cart: ", error);
  }
};

export const fetchCartItems = async (
  studentId: string
): Promise<ICartItem[]> => {
  try {
    const cartRef = collection(db, `students/${studentId}/cart`);
    const cartSnapshot = await getDocs(query(cartRef));

    const cartItems: ICartItem[] = cartSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ICartItem[];

    return cartItems;
  } catch (error) {
    console.error("Error fetching cart items: ", error);
    throw error;
  }
};
