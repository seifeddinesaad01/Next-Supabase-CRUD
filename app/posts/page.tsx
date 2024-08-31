"use client"
import supabase from "../../config/supabase";
import Head from "next/head";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [tasks, setTasks] = useState<any>([]);

  const getTasks = async () => {
    const { data, error } = await supabase.from('posts').select('*');
    if (error) {
      console.error('Error fetching data:', error.message);
    } else {
      setTasks(data);
    }
  }

  useEffect(() => {
    getTasks()
  }, [])

  return (
    <>
      <div className="container mx-auto mt-8 max-w-[560px]">
        <div className="flex justify-between items-center pb-4 border-b border-dashed border-gray-900 mb-4">
          <h1 className="text-3xl font-semibold">Tasks</h1>
          <Link
            className="bg-green-600 hover:bg-opacity-80 text-white rounded-lg px-4 py-2 duration-200"
            href="/create"
          >
            Create New
          </Link>
        </div>
        <ul>
          {tasks.map((task:any) => (
            <li key={task.id} className="py-2 flex justify-between w-full">
              <span>
                <strong>{task.title}</strong> - {task.description}
              </span>
              <span className="flex gap-2">
                <Link className="text-blue-700 underline hover:no-underline" href={`/${task.id}/edit`}>Edit</Link>
                <Link className="text-red-500 underline hover:no-underline" href={`/${task.id}/delete`}>Delete</Link>
              </span>
            </li>
          ))}
          {tasks?.length < 1 && <div className="py-2">No data</div>}
        </ul>
      </div>
      <Head>
        <title>Task</title>
      </Head>
    </>
  );
}
