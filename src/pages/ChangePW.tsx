import React, { useState } from "react";
import MyPageLayout from "../components/MyPageLayout";
import useMe from "../hooks/\buseMe";
import {
  EmailAuthProvider,
  reauthenticateWithCredential,
  updatePassword,
} from "firebase/auth";

const ChangePassword: React.FC = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const { currentUser } = useMe();

  const handlePasswordChange = async () => {
    if (newPassword !== confirmPassword) {
      alert("새 비밀번호가 일치하지 않습니다.");
      return;
    }

    try {
      if (currentUser) {
        const credential = EmailAuthProvider.credential(
          currentUser.email!,
          currentPassword
        );

        await reauthenticateWithCredential(currentUser, credential);
        await updatePassword(currentUser, newPassword);
        alert("비밀번호가 성공적으로 변경되었습니다.");
      }
    } catch (error: any) {
      console.error(error);
      alert("비밀번호 변경에 실패했습니다.");
    } finally {
      setNewPassword("");
      setConfirmPassword("");
      setCurrentPassword("");
    }
  };

  const renderForm = () => (
    <form onSubmit={(e) => e.preventDefault()} className="space-y-4">
      <input
        type="password"
        placeholder="현재 비밀번호"
        className="border-2 w-full p-3"
        value={currentPassword}
        onChange={(e) => setCurrentPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="새 비밀번호"
        className="border-2 w-full p-3"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
      />
      <input
        type="password"
        placeholder="새 비밀번호 확인"
        className="border-2 w-full p-3"
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button
        type="button"
        onClick={handlePasswordChange}
        className="bg-yellow-400 text-gray-700 py-3 rounded w-full"
      >
        비밀번호 변경
      </button>
    </form>
  );

  return (
    <div className="min-h-screen">
      <div className="p-6 xl:container xl:mx-auto">
        {/* xl 이하일 때 보이는 내용 */}
        <div className="block xl:hidden">
          <div className="bg-white p-4">
            <h1 className="text-gray-800 text-xl mb-4">비밀번호 변경</h1>
            {renderForm()}
          </div>
        </div>

        {/* xl 이상일 때 보이는 내용 */}
        <div className="hidden xl:flex w-full">
          <MyPageLayout title="비밀번호 변경" subtitle="">
            <div className="w-full max-w-lg mx-auto bg-white p-6">
              {renderForm()}
            </div>
          </MyPageLayout>
        </div>
      </div>
    </div>
  );
};

export default ChangePassword;
