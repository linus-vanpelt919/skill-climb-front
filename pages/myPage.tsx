// pages/mypage.tsx
import { useRouter } from "next/router";
import React from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface UserData {
  id: number;
  name: string;
  email: string;
}

const API_URL = "http://skill-climb_laravel.test_1:80/api/show";


interface MyPageProps {
  user: UserData | null;
}

const MyPage: React.FC<MyPageProps> = ({ user }) => {
  const [userData, setUserData] = React.useState<UserData | null>(user);
  console.log("userData", userData);
  return (
    <div>
      <Head>
        <title>SKILL CLIMB</title>
      </Head>
      <Header />
      {userData && (
        <div>
          <p>Name: {userData.email}さん</p>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default MyPage;

export const getServerSideProps: GetServerSideProps = async (context) => {

  const cookie = context.req.headers.cookie;
  try {
    const response = await axios.get(API_URL, {
      headers: {
        origin: 'localhost:3000',
        cookie: cookie,
      },
    });
    return { props: { user: response.data } };
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 401) {

      return {
        redirect: {
          destination: "/auth/login",
          permanent: false,
        },
      };
    } else {
      // Handle other errors
      return { props: { user: "test" } };
    }
  }
};
