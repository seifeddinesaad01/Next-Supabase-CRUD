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

  const [post, setPost] = useState<Task>({
    title: "",
    description: "",
  });

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    const fetchPost = async () => {
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
          setPost(data);
        }
      }
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleUpdate = async () => {
    try {
      if (typeof id === "string") {
        const { error } = await supabase.from("posts").update(post).eq("id", id);

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
          <h1 className="text-3xl font-semibold">Edit Post</h1>
        </div>
        <form>
          <div className="mb-4">
            <label htmlFor="name">Title</label>
            <input
              className="mt-1 px-4 py-2 border border-gray-300 rounded-md block w-full"
              type="text"
              id="title"
              name="title"
              value={post.title}
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
              value={post.description}
              onChange={onChange}
            />
          </div>
          <button
            className="bg-green-600 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200 w-full"
            type="button"
            onClick={handleUpdate}
          >
            Edit Post
          </button>
        </form>
      </div>
      <Head>
        <title>Edit Post</title>
      </Head>
    </>
  );
};

export default Edit;
