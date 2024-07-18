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
        className="flex flex-col items-start px-6 py-36 xl:px-12 xl:py-16 w-full max-w-xl mx-auto bg-white xl:shadow"
      >
        <img
          src="/images/logo.svg"
          alt="Logo"
          className=" w-44 mb-20 xl:mb-12"
        />
        <div className="flex flex-col w-full gap-y-3 mb-6">
          <label className="text-sm text-gray-700">
            아이디 &nbsp;
            <span className=" text-red-500">*</span>
          </label>
          <input
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className=" border border-gray-300 outline-none shadow px-3 py-4 text-sm "
            placeholder="아이디를 입력하세요."
          />
        </div>
        <div className="flex flex-col w-full gap-y-3 mb-12">
          <label className="text-sm text-gray-700">
            비밀번호 &nbsp;
            <span className=" text-red-500">*</span>
          </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className=" border border-gray-300 outline-none shadow px-3 py-4 text-sm"
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
