// pages/profile.tsx
import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Image from "next/image";
import axios from "axios";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { ProfileForm } from "@/components/ProfileForm";

export interface UserData {
  id: number;
  name: string;
  email: string;
  githubUrl: string;
}
interface User {
  name: string;
  bio: string;
  image: string;
  githubUrl: string;
}

interface MyPageProps {
  user: UserData | null;
}

const API_URL = "http://skill-climb_laravel.test_1:80/api/show";

const Profile: React.FC<MyPageProps> = ({ user }) => {
  // const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [githubUrl, setGithubUrl] = useState<string>("");

  const [userData, setUserData] = React.useState<UserData | null>(user);
  const [email, setEmail] = React.useState(userData?.email || "");
  const [username, setUserName] = React.useState(userData?.name || "");

  // const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   // ここで username, bio, githubUrl を使用してプロフィールを更新します
  // };

  return (
    <>
      <Head>
        <title>SKILL CLIMB</title>
      </Head>
      <Header />
      <div className="bg-white	w-full h-screen mt-20">
        <div className="md:flex">
          <div className="md:w-1/2 max-w-lg mx-auto">
            <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">
              プロフィール編集
            </h2>
            <ProfileForm userData={userData} />
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Profile;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const cookie = context.req.headers.cookie;
  try {
    const response = await axios.get(API_URL, {
      headers: {
        origin: "localhost:3000",
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
