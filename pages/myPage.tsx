// pages/mypage.tsx
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { checkIfUserIsLoggedIn, handleLogout } from "./utils/auth";
import Link from "next/link";
import axios from "axios";
// import useSWR, { mutate } from "swr";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface UserData {
  id: number;
  name: string;
  email: string;
}

const API_URL = "http://localhost/api/show";

const MyPage: React.FC = () => {
  const [userData, setUserData] = React.useState<UserData | null>(null);
  const router = useRouter();

  //http://localhost/api/showエンドポイントからaxiosでデータを取得する
  const fetcher = async (url: string): Promise<UserData> => {
    const response = await axios.get(url, { withCredentials: true });
    return response.data;
  };

  //  const { data: user, error } = useSWR("/api/show", fetcher);

  useEffect(() => {
    const fetchData = async () => {
      const userData = await fetcher(API_URL);
      setUserData(userData);
    };
    fetchData();
  }, []);


  return (
    <div>
      <Head>
        <title>SKILL CLIMB</title>
      </Head>
      <Header />
      {userData && (
        <div>
          <p>Name: {userData.name}さん</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MyPage;
