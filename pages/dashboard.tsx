import React, { useState, useEffect } from "react";
import Head from "next/head";
import useSWR, { mutate } from "swr";
import axios from 'axios';

interface Task {
  id: number;
  title: string;
  description: string;
}
const API_URL = "http://localhost/api/tasks";
const fetcher = async (url: string): Promise<Task[]> => {
  const response = await axios.get(url);
  return response.data;
};

const Dashboard: React.FC = () => {
  const { data: tasks, error } = useSWR<Task[]>(
    `${API_URL}`,
    fetcher
  );
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [updatingTask, setUpdatingTask] = useState<Task | null>(null);

  if (error) return <div>Error: {error.message}</div>;
  if (!tasks) return <div>Loading...</div>;


  const addTask = async () => {
    try {
      const response = await axios.post(API_URL, {
        title,
        description,
      });

      const newTaskData = response.data;
      mutate(API_URL, [...tasks, newTaskData], false);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("An error occurred while adding the task.", error);
    }
  };

  const updateTask = async (task: Task) => {
    try {
      const response = await axios.put(`${API_URL}/${task.id}`, task);
      const updatedTaskData = response.data;
      const updatedTasks = tasks.map((t) =>
        t.id === updatedTaskData.id ? updatedTaskData : t
      );
      mutate(API_URL, updatedTasks, false);
      setUpdatingTask(null);
    } catch (error) {
      console.error("An error occurred while updating the task.", error);
    }
  };

  const deleteTask = async (taskId: number) => {
    try {
      await axios.delete(`${API_URL}/${taskId}`);
      const remainingTasks = tasks.filter((task) => task.id !== taskId);
      mutate(API_URL, remainingTasks, false);
    } catch (error) {
      console.error("An error occurred while deleting the task.", error);
    }
  };
/*
Todo
編集機能
削除機能
詳細ページ

*/

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <main>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <div className="mb-4">
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Task title"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <div className="mb-4">
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Task description"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
            <button
              onClick={addTask}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg"
            >
              Add Task
            </button>

            <div className="container mx-auto px-4 py-8">
              <h1 className="text-2xl font-bold mb-6">タスク一覧</h1>
              <div className="grid grid-cols-1 gap-6">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                  >
                    <h2 className="text-xl font-semibold mb-4 text-black">
                      {task.title}
                    </h2>
                    <p className="text-black">{task.description}</p>
                    <div className="flex justify-end">
                      <button
                        className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                        onClick={() => updateTask(task.id)}
                      >
                        編集
                      </button>
                      <button
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                        onClick={() => deleteTask(task.id)}
                      >
                        削除
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
