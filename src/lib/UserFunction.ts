import {
  getDoc,
  doc,
  collection,
  getDocs,
  Timestamp,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../firebase";
import { IStudent } from "../definitions/StudentTypes";
import { ICartItem } from "../definitions/ProductTypes";
import { QueryOutput } from "../definitions/common-types";

export interface IRecord {
  id: string;
  amount: number;
  detail: string;
  createdAt: Timestamp;
  createdBy: string;
  type: string;
}

export interface StudentBalance {
  balance: number;
  records: IRecord[];
}

export const getStudentData = async (
  studentId: string
): Promise<QueryOutput<IStudent>> => {
  try {
    const studentDocRef = doc(db, "students", studentId);
    const studentDoc = await getDoc(studentDocRef);

    if (!studentDoc.exists()) {
      throw new Error("No such document!");
    }

    const cartColRef = collection(studentDocRef, "cart");
    const cartSnapshot = await getDocs(cartColRef);
    const cartItems: ICartItem[] = cartSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as ICartItem[];

    const studentData = studentDoc.data() as IStudent;
    studentData.cart = cartItems;

    return {
      ok: true,
      data: studentData,
    };
  } catch (error: any) {
    console.error("student fetching error");

    return {
      ok: false,
      error: error?.message || "Cannot get student data",
    };
  }
};

export const getStudentBalance = async (
  studentId: string
): Promise<QueryOutput<StudentBalance>> => {
  try {
    const balanceDoc = await getDoc(doc(db, "do", studentId));
    if (!balanceDoc.exists()) {
      throw new Error("No such document!");
    }

    const data = balanceDoc.data() as StudentBalance;

    // Fetching the records sub-collection
    const recordsCollection = collection(db, `do/${studentId}/record`);
    const recordsQuery = query(recordsCollection, orderBy("createdAt", "desc"));
    const recordsSnapshot = await getDocs(recordsQuery);

    const records: IRecord[] = recordsSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as IRecord[];

    return {
      ok: true,
      data: {
        ...data,
        records,
      },
    };
  } catch (error: any) {
    return {
      ok: false,
      error: error?.message || "Cannot get student balance",
    };
  }
};
