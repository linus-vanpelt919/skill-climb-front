// pages/mypage.tsx
import { useRouter } from "next/router";
import React from "react";
import { GetServerSideProps } from "next";
import axios from "axios";
import Head from "next/head";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface TaskData {
  id: number;
  title: string;
  description: string;
  category_id: number;
  category: CategoryData;
}

const API_URL = "http://skill-climb_laravel.test_1:80/api/myPage";

interface CategoryData {
  id: number;
  name: string;
}

interface MyPageProps {
  tasks: TaskData[] | null;
}

const MyPage: React.FC<MyPageProps> = ({ tasks }) => {
  const [taskData, setTaskData] = React.useState<TaskData[] | null>(tasks);

    // タスクをカテゴリーでグループ化
    const groupedTasks: Record<string, TaskData[]> | undefined = taskData?.reduce<Record<string, TaskData[]>>((acc, task) => {
      (acc[task.category_id] = acc[task.category_id] || []).push(task);
      return acc;
    }, {});

  return (
    <div className="flex flex-col items-center justify-between min-h-screen">
      <Head>
        <title>SKILL CLIMB</title>
      </Head>
      <Header />
      <div className="flex flex-col w-full p-8 space-y-4 items-center lg:w-1/3">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
          mypage
        </h2>
        {groupedTasks &&
          Object.entries(groupedTasks).map(([categoryId, tasks]) => (
            <React.Fragment key={categoryId}>
              <h3 className="mt-4 text-2xl font-bold text-gray-900">
                {tasks[0].category.name}
              </h3>
              {tasks.map((task: TaskData) => (
                <div
                  key={task.id}
                  className="p-4 mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 w-full"
                >
                 <div className="flex-shrink-0">
                <svg
                  className="h-12 w-12"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" fill="#2F855A" />
                  <path d="M12 14l9-5-9-5-9 5 9 5z" fill="#2F855A" />
                  <path d="M21 19l-9 5-9-5" fill="#2F855A" />
                  <path d="M3 10l9-5 9 5-9 5-9-5z" fill="#2F855A" />
                </svg>
              </div>
              <div>
                <div className="text-xl font-medium text-black">
                  {task.title}
                </div>
                <p className="text-gray-500">{task.description}</p>
              </div>
                </div>
              ))}
            </React.Fragment>
          ))}

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
        origin: "localhost:3000",
        cookie: cookie,
      },
    });
    return { props: { tasks: response.data.tasks } };
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
