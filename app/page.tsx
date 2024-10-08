"use client"
import supabase from "../config/supabase";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";
import { CiEdit } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { Empty } from 'antd';



export default function Home() {
  const [posts, setPosts] = useState<any>([]);

  const getPosts = async () => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      console.error('Error fetching data:', error.message);
    } else {
      setPosts(data);
    }
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <>
      <div className="container mx-auto mt-8 max-w-[560px] bg-white p-4 rounded-lg min-h-60">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
          <h1 className="text-3xl font-semibold">Posts</h1>
          <Link
            className="bg-black hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200"
            href="/create"
          >
            Create New
          </Link>
        </div>
        <ul>
          {posts.map((task:any) => (
            <li key={task.id} className="py-2 flex justify-between w-full">
              <span>
                <strong>{task.title}</strong> - {task.description}
              </span>
              <span className="flex gap-2">
                <Link className="text-blue-700 underline hover:no-underline flex justify-center items-center gap-2" href={`/edit/${task.id}`}><CiEdit />Edit</Link>
                <Link className="text-red-500 underline hover:no-underline flex justify-center items-center gap-2" href={`/delete/${task.id}`}><MdDeleteOutline />Delete</Link>
              </span>
            </li>
          ))}
          {posts?.length < 1 && <Empty />}
        </ul>
      </div>
      <Head>
        <title>Post</title>
      </Head>
    </>
  );
}
