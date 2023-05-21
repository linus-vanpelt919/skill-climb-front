import Link from "next/link";
import React, { useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/router";

const Header = () => {
  const router = useRouter();
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
    <header className="bg-white shadow-md w-full">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
        <h1 className="text-3xl font-bold text-blue-500">
          <Link href="/">Skill Climb</Link>
        </h1>
        <nav className="space-x-4 text-blue-500 text-lg flex items-center">
          <Link href="/auth/signUp" className="hover:text-blue-700">
            会員登録
          </Link>
          <Link href="/auth/login" className="hover:text-blue-700">
            ログイン
          </Link>
          <Link href="/dashboard" className="hover:text-blue-700">
            ダッシュボードへ
          </Link>
          <button
            type="submit"
            className="group relative flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            onClick={handleLogout}
          >
            ログアウト
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
