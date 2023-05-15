// pages/profile.tsx
import React, { useState } from 'react';
import Image from 'next/image';
import Head from "next/head";
import Header from '@/components/Header';

interface User {
  name: string;
  bio: string;
  image: string;
  githubUrl: string;
}

const Profile: React.FC = () => {
  const [username, setUsername] = useState<string>("");
  const [bio, setBio] = useState<string>("");
  const [githubUrl, setGithubUrl] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // ここで username, bio, githubUrl を使用してプロフィールを更新します
  };

  return (
    <>
      <Head>
          <title>SKILL CLIMB</title>
      </Head>
      <Header/>
    <div className="bg-white	w-full h-screen">
      <div className="md:flex">
        <div className="md:w-1/2 max-w-lg mx-auto">
        <h2 className="text-3xl font-semibold text-center mb-6 text-gray-700">プロフィール編集</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label htmlFor="username" className="block mb-2 text-gray-700">
              ユーザー名
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div className="mb-6">
            <label htmlFor="bio" className="block mb-2 text-gray-700">
              自己紹介
            </label>
            <textarea
              id="bio"
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              rows={3}
            />
          </div>
          <div className="mb-6">
            <label htmlFor="githubUrl" className="block mb-2 text-gray-700">
              GitHub URL
            </label>
            <input
              type="text"
              id="githubUrl"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            プロフィールを更新
          </button>
        </form>
        </div>
      </div>
    </div>
    </>
  );

};

export default Profile;
