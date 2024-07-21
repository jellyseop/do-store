import { User } from "firebase/auth";
import { useAuth } from "../AuthProvider";

interface UseMeReturnType {
  currentUser: User | null;
  loading: boolean;
}

const useMe = (): UseMeReturnType => {
  const { currentUser, loading } = useAuth();
  return { currentUser, loading };
};

export default useMe;
