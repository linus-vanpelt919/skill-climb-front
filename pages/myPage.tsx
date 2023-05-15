// pages/mypage.tsx
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { checkIfUserIsLoggedIn, handleLogout } from "./utils/auth";
import Link from "next/link";
import axios from "axios";

const MyPage: React.FC = () => {
  const router = useRouter();

  // useEffect(() => {
  //   const checkLoginStatus = async () => {
  //     //ここでログイン状態をチェックするAPIを呼び出す
  //     const isLoggedIn = await checkIfUserIsLoggedIn();

  //     if (!isLoggedIn) {
  //       router.push('/auth/login');
  //     }
  //   };

  //   checkLoginStatus();
  // }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost/api/logout", null, {
        withCredentials: true,
      });
      router.push("/auth/login");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>My Page</h1>
      <button
        type="submit"
        className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        onClick={handleLogout}
      >
        ログアウト
      </button>
    </div>
  );
};

export default MyPage;
