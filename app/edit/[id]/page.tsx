"use client";

import supabase from "@/config/supabase";
import Head from "next/head";
import { useParams, useRouter } from "next/navigation"; // Use next/navigation for Next.js 13+
import { useEffect, useState } from "react";

interface Task {
  title: string;
  description: string;
}

const Edit = () => {
  const router = useRouter();

  const { id } = useParams();
  console.log(id,"id")

  const [task, setTask] = useState<Task>({
    title: "",
    description: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchTask = async () => {
      if (typeof id === "string") {
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("id", id)
          .single();

        if (error) {
          console.error("Error fetching task:", error.message);
          return;
        }

        if (data) {
          setTask(data);
          console.log(data,"data")
        }
      }
    };

    if (id) {
      fetchTask();
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      if (typeof id === "string") {
        const { error } = await supabase.from("posts").update(task).eq("id", id);

        if (error) {
          console.error("Error updating task:", error.message);
          return;
        }

        router.push("/");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-8 max-w-[560px]">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
          <h1 className="text-3xl font-semibold">Edit Task</h1>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="name">Title</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="text"
              id="title"
              name="title"
              value={task.title}
              onChange={onChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description">Description</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="text"
              id="description"
              name="description"
              value={task.description}
              onChange={onChange}
            />
          </div>
          <button
            className="bg-green-600 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200 w-full"
            type="button"
            onClick={handleUpdate}
          >
            Edit Task
          </button>
        </form>
      </div>
      <Head>
        <title>Edit Task</title>
      </Head>
    </>
  );
};

export default Edit;
