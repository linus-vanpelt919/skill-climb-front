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

  const [email, setEmail] = React.useState(userData?.email || "");
  const [name, setName] = React.useState(userData?.name || "");

  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <Head>
        <title>SKILL CLIMB</title>
      </Head>
      <Header />
      <div className="flex flex-col w-full p-8 space-y-4 items-center md:w-1/2 lg:w-1/3">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Profile</h2>
        <input
          type="text"
          name="name"
          id="name"
          autoComplete="name"
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <input
          type="email"
          name="email"
          id="email"
          autoComplete="email"
          className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
          placeholder="Email address"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button
          type="submit"
          className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
        >
          Update
        </button>
      </div>
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
      return { props: { user: "" } };
    }
  }
};
