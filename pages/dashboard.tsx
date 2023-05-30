import React, { useState, useEffect } from "react";
import Head from "next/head";
import useSWR, { mutate } from "swr";
import axios from "axios";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

interface Task {
  id: number;
  title: string;
  description: string;
  name: string;
}

interface Category {
  id: number;
  name: string;
}

interface Response {
  tasks: Task[];
  categories: Category[];
}

const API_URL = "http://localhost/api/tasks";
const fetcher = async (url: string): Promise<Response> => {
  const response = await axios.get(url, { withCredentials: true });
  return response.data;
};

const Dashboard: React.FC = () => {
  const { data, error } = useSWR<Response>(`${API_URL}`, fetcher);

  const tasks = data?.tasks;
  const categories = data?.categories;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState(1);
  const [updatingTask, setUpdatingTask] = useState<Task | null>(null);
  const [editingTaskId, setEditingTaskId] = useState<number | null>(null);
  const [editingTitle, setEditingTitle] = useState<string>("");
  const [editingDescription, setEditingDescription] = useState<string>("");

  if (error) return <div>Error: {error.message}</div>;

  if (!tasks) return <div>Loading...</div>;

  const addTask = async (e: React.FormEvent) => {
    e.preventDefault();
    const previousTasks = data; // 保存したタスクのコピーを保持
    try {
      const response = await axios.post(
        API_URL,
        {
          title,
          description,
          category_id: category,
        },
        { withCredentials: true }
      );
      const newTaskData = response.data;
      mutate(API_URL, { ...data, tasks: [...tasks, newTaskData] }, false);
      setTitle("");
      setDescription("");
    } catch (error) {
      console.error("An error occurred while adding the task.", error);
      mutate(API_URL, previousTasks, false); // エラーが発生した場合は、元のタスクのリストにロールバック
    }
  };

  const updateTask = async (task: Partial<Task> & { id: number }) => {
    const previousData = data; // 元のdataのコピーを保持
    try {
      const response = await axios.patch(`${API_URL}/${task.id}`, task, {
        withCredentials: true,
      });
      const updatedTaskData = response.data;
      const updatedTasks = tasks.map((t) =>
        t.id === updatedTaskData.id ? updatedTaskData : t
      );
      mutate(API_URL, { ...data, tasks: updatedTasks }, false);
      setUpdatingTask(null);
    } catch (error) {
      console.error("An error occurred while updating the task.", error);
      mutate(API_URL, previousData, false);
    }
  };

  const deleteTask = async (taskId: number) => {
    const previousData = data; // 元のdataのコピーを保持
    try {
      await axios.delete(`${API_URL}/${taskId}`, { withCredentials: true });
      const remainingTasks = tasks.filter((task) => task.id !== taskId);
      mutate(API_URL, { ...data, tasks: remainingTasks }, false);
    } catch (error) {
      console.error("An error occurred while deleting the task.", error);
      mutate(API_URL, previousData, false); // エラーが発生した場合は、元のdataにロールバック
    }
  };

  const startEditingTask = (task: Task) => {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
    setEditingDescription(task.description);
  };

  const confirmEditingTask = async () => {
    if (editingTaskId === null) return;

    const taskToUpdate: Partial<Task> = {
      id: editingTaskId,
      title: editingTitle,
      description: editingDescription,
    };

    if (taskToUpdate && typeof taskToUpdate.id === "number") {
      await updateTask(taskToUpdate as Task);
    } else {
      console.error("taskToUpdate is undefined or does not have a valid id");
    }

    setEditingTaskId(null);
    setEditingTitle("");
    setEditingDescription("");
  };

  /*
Todo
編集機能
削除機能
詳細ページ
カテゴリー機能
*/

  return (
    <div className="bg-gray-100 min-h-screen">
      <Head>
        <title>Admin Dashboard</title>
      </Head>
      <Header />
      <main>
        <div className="bg-white overflow-hidden shadow rounded-lg">
          <div className="px-4 py-5 sm:p-6">
            <form onSubmit={addTask}>
              <div className="mb-4">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Task title"
                  className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Task description"
                  className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-lg"
                />
              </div>
              <div className="mb-4">
                <select
                  value={category}
                  onChange={(e) => setCategory(parseInt(e.target.value))}
                  placeholder="Task description"
                  className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-lg"
                >
                  {categories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <button
                type="submit"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg"
              >
                Add Task
              </button>
            </form>

            <div className="container mx-auto px-4 py-8">
              <h1 className="text-2xl font-bold mb-6">タスク一覧</h1>
              <div className="grid grid-cols-1 gap-6">
                {tasks.map((task) => (
                  <div
                    key={task.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 ${editingTaskId === task.id ? 'animate-fadeIn' : 'animate-fadeOut'}`"
                  >
                    {editingTaskId === task.id ? (
                      <div>
                        <input
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          placeholder="Task title"
                          className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-lg mb-2"
                        />
                        <input
                          type="text"
                          value={editingDescription}
                          onChange={(e) =>
                            setEditingDescription(e.target.value)
                          }
                          placeholder="Task description"
                          className="w-full px-3 py-2 border border-gray-300 text-gray-900 rounded-lg mb-4"
                        />
                        <button
                          onClick={confirmEditingTask}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg mr-2"
                        >
                          Update Task
                        </button>
                        <button
                          onClick={() => setEditingTaskId(null)}
                          className="bg-gray-600 text-white px-4 py-2 rounded-lg"
                        >
                          Cancel
                        </button>
                      </div>
                    ) : (
                      <div>
                        <h2 className="text-xl font-semibold mb-4 text-black">
                          {task.title}
                        </h2>
                        <p className="text-black">{task.description}</p>
                        <div className="flex justify-end">
                          <button
                            onClick={() => startEditingTask(task)}
                            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => deleteTask(task.id)}
                            className="bg-red-500 text-white px-4 py-2 rounded-md"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Dashboard;
