import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await signInWithEmailAndPassword(
        auth,
        email + "@do-it.student",
        password
      );

      navigate("/");
    } catch (error) {
      setError("Failed to log in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen xl:bg-gray-100 xl:flex xl:items-center">
      <form
        onSubmit={handleSubmit}
        className="h-full flex flex-col items-start px-6 py-44 xl:px-12 xl:py-16 w-full max-w-xl mx-auto bg-white xl:shadow"
      >
        <div className="text-4xl font-semibold text-yellow-300 mb-12">
          Do Store
        </div>
        <div className="flex flex-col w-full gap-y-3 mb-6">
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className=" border border-gray-300 outline-none focus:border-gray-500  px-3 py-4 text-sm "
            placeholder="아이디를 입력하세요."
          />
        </div>
        <div className="flex flex-col w-full gap-y-3 mb-12">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className=" border border-gray-300 outline-none focus:border-gray-500  px-3 py-4 text-sm"
            placeholder="비밀번호를 입력하세요."
          />
        </div>
        <button
          type="submit"
          className="bg-yellow-300 text-center w-full py-3.5 text-gray-800 tracking-wide"
          disabled={loading}
        >
          {loading ? "Loading..." : "로그인"}
        </button>
        {error && <p>{error}</p>}
      </form>
    </div>
  );
};

export default Login;
