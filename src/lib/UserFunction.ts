import { getDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import { IStudent } from "../definitions/StudentTypes";

type QueryOutput<T> = QuerySuccessOutput<T> | ErrorOutput;

interface QuerySuccessOutput<T> extends SuccessOutput {
  data: T;
}

interface SuccessOutput {
  ok: true;
}

interface ErrorOutput {
  ok: false;
  error: string;
}

export interface StudentBalance {
  balance: number;
}

export const getStudentData = async (
  studentId: string
): Promise<QueryOutput<IStudent>> => {
  try {
    const studentDoc = await getDoc(doc(db, "students", studentId));

    if (!studentDoc.exists()) {
      throw new Error("No such document!");
    }
    return {
      ok: true,
      data: studentDoc.data() as IStudent,
    };
  } catch (error: any) {
    console.log("student fetching error");

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
    return {
      ok: true,
      data: balanceDoc.data() as StudentBalance,
    };
  } catch (error: any) {
    return {
      ok: false,
      error: error?.message || "Cannot get student balance",
    };
  }
};
