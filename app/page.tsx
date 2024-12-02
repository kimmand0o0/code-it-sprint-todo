'use client'

import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";

import ClipLoader from "react-spinners/ClipLoader";

import Search from "@/app/components/search";
import CheckList from "@/app/components/check-list";

import useWindowWidth from "@/app/utils/getWindowWidth";

import TodoLabel from '@/app/assets/images/todo-label.svg'
import TodoLarge from '@/app/assets/images/todo-large.svg'
import TodoSmall from '@/app/assets/images/todo-small.svg'
import DoneLabel from '@/app/assets/images/done-label.svg'
import DoneLarge from '@/app/assets/images/done-large.svg'
import DoneSmall from '@/app/assets/images/done-small.svg'

interface ITodo {
  "id": number;
  "name": string;
  "isCompleted": boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>()

  const [error, setError] = useState<boolean>(false)
  const [loading, setLoading] = useState<boolean>(false)

  const width = useWindowWidth()

  const todoList = todos?.filter((_todo) => !_todo.isCompleted)
  const doneList = todos?.filter((_todo) => _todo.isCompleted)
  
  const fetchTodos = async () => {
    try {
      setLoading(true)

      const { data } = await axios.get('https://assignment-todolist-api.vercel.app/api/kimmandoo/items?page=1&pageSize=10')
      setTodos(data)
      console.log(data)
    } catch (err) {
      console.log(err)
      setError(true)
    }

    setLoading(false)
  }

  useEffect(() => {
    fetchTodos()
  },[])

  if(error) return (
    <div className="size-full flex justify-center items-center">
      에러가 발생했습니다. 잠시후 다시 시도해주세요
    </div>
  )

  if(loading) return(
    <div className="size-full flex justify-center items-center">
      <ClipLoader
        color="#7C3AED"
        loading={loading}
        size={100}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  )

  return (
    <main className="w-full flex flex-col justify-center">
      <Search />
      <div className={`flex ${width > 1200 ? 'flex-row' : 'flex-col'}`}>
        <ul className={`w-full ${width > 1200 ? 'mr-1' : ''}`}>
          <Image src={TodoLabel} alt="todo-label" className="mt-10"/>
          {todoList?.map((_todo) => <CheckList key={_todo.id} id={_todo.id} name={_todo.name} isCompleted={_todo.isCompleted} /> )}
          {todoList?.length === 0 && 
          <div className="size-full flex justify-center items-center">
            <Image src={width < 600 ? TodoSmall : TodoLarge} alt="todo-list-none"/>
          </div>
          }
        </ul>
        <ul className={`w-full ${width > 1200 ? 'ml-1' : ''}`}>
          <Image src={DoneLabel} alt="done-label" className="mt-10"/>
          {doneList?.map((_todo) => <CheckList key={_todo.id} id={_todo.id} name={_todo.name} isCompleted={_todo.isCompleted} /> )}
          {doneList?.length === 0 && 
          <div className="size-full flex justify-center items-center">
            <Image src={width < 600 ? DoneSmall : DoneLarge} alt="done-list-none"/>
          </div>
          }
        </ul>
      </div>
    </main>
  );
}
