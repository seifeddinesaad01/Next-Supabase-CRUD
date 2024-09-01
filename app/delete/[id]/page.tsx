"use client"
import supabase from "@/config/supabase";
import Head from "next/head";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Delete = () => {
  const router = useRouter();
  const { id } = useParams();

  const [post, setPost] = useState<any>({
    title: "",
    description: "",
  });

  useEffect(() => {
    const fetchPost = async () => {
      const { data } = await supabase.from("posts").select("*").eq("id", id);
      setPost(data);
    };

    if (id) {
      fetchPost();
    }
  }, [id]);

  const handleDelete = async () => {
    try {
      await supabase.from("posts").delete().eq("id", id);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="container mx-auto mt-8 max-w-[560px] bg-white p-4 rounded-lg min-h-60">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
          <h1 className="text-3xl font-semibold">Delete Post</h1>
        </div>
       
        <form>
          <div className="my-12">
            Are you sure to delete <strong>{post?.name}</strong>?
          </div>
          <div className="flex w-full gap-2">
            <Link
              href="/"
              className="text-center bg-gray-300 hover:bg-opacity-80 text-black rounded-lg px-4 py-2 duration-200 w-full"
            >
              Cancel
            </Link>
            <button
              className="bg-black hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200 w-full"
              type="button"
              onClick={handleDelete}
            >
              Delete
            </button>
          </div>
        </form>
      </div>
      <Head>
        <title>Delete Post</title>
      </Head>
    </>
  );
};

export default Delete;
