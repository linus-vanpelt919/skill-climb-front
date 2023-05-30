// components/ProfileForm.tsx
import React, { useState } from "react";
import { UserData } from "../pages/profile";
import axios from "axios";
import useSWR, { mutate } from "swr";

interface ProfileFormProps {
  userData: UserData | null;
}
const API_URL = "http://skill-climb_laravel.test_1:80/api/update";

interface userData {
  name: string;
  email: string;
}

const fetcher = async (url: string) => {
  const response = await axios.get(url, { withCredentials: true });
  return response.data;
};


export const ProfileForm: React.FC<ProfileFormProps> = ({ userData }) => {
  const [email, setEmail] = useState(userData?.email || "");
  const [username, setUserName] = useState(userData?.name || "");
  // const [bio, setBio] = useState<string>("");
  // const [githubUrl, setGithubUrl] = useState<string>("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const userData = {
      name: username,
      email: email,
    };
    try {
      const response = axios.patch(API_URL, userData, { withCredentials: true });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-6">
        <label htmlFor="username" className="block mb-2 text-gray-700">
          ユーザー名
        </label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      <div className="mb-6">
        <label htmlFor="email" className="block mb-2 text-gray-700">
          Eメール
        </label>
        <input
          type="text"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-md"
        />
      </div>
      {/* <div className="mb-6">
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
      </div> */}
      <button
        type="submit"
        className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        プロフィールを更新
      </button>
    </form>
  );
};
