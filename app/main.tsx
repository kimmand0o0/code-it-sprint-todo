"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

import ClipLoader from "react-spinners/ClipLoader";

import Search from "@/app/components/search";
import CheckList from "@/app/components/check-list";

import useWindowWidth from "@/app/utils/getWindowWidth";

import { getTodoById, getTodos, updateComplete } from "@/app/api/actions";

import TodoLabel from "@/app/assets/images/todo-label.svg";
import TodoLarge from "@/app/assets/images/todo-large.svg";
import TodoSmall from "@/app/assets/images/todo-small.svg";
import DoneLabel from "@/app/assets/images/done-label.svg";
import DoneLarge from "@/app/assets/images/done-large.svg";
import DoneSmall from "@/app/assets/images/done-small.svg";

export interface ITodo {
  id: number;
  name: string;
  isCompleted: boolean;
  memo?: string;
  imageUrl?: string;
  tenantId?: string;
}

export default function Home() {
  const [todos, setTodos] = useState<ITodo[]>();

  const [error, setError] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  const width = useWindowWidth();

  const fetchTodos = async () => {
    try {
      setLoading(true);

      const data = await getTodos();

      setTodos(data);
    } catch (err) {
      console.log(err);
      setError(true);
    }

    setLoading(false);
  };

  const handleUpdateComplete = async (id: number) => {
    try {
      setLoading(true);

      const data = await getTodoById(id);

      await updateComplete(data);

      setTodos(
        todos?.map((_todo) => {
          if (_todo.id === id)
            return {
              ..._todo,
              isCompleted: true,
            };

          return _todo;
        }),
      );
    } catch (error) {
      alert("업데이트에 실패하였습니다. 잠시 후 다시 시도해주세요!");
    }

    setLoading(false);
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const todoList = todos?.filter((_todo) => !_todo.isCompleted);
  const doneList = todos?.filter((_todo) => _todo.isCompleted);

  if (error)
    return (
      <div className="size-full flex justify-center items-center">
        에러가 발생했습니다. 잠시후 다시 시도해주세요
      </div>
    );

  if (loading)
    return (
      <div className="size-full flex justify-center items-center">
        <ClipLoader
          color="#7C3AED"
          loading={loading}
          size={100}
          aria-label="Loading Spinner"
          data-testid="loader"
        />
      </div>
    );

  return (
    !!todos?.length && (
      <main className="w-full flex flex-col justify-center">
        <Search initialTodos={todos} setTodos={setTodos} />
        <div className={`flex ${width > 1200 ? "flex-row" : "flex-col"}`}>
          <ul className={`w-full ${width > 1200 ? "mr-1" : ""}`}>
            <Image src={TodoLabel} alt="todo-label" className="mt-10" />
            {!!todoList?.length &&
              todoList?.map((_todo) => (
                <CheckList
                  key={_todo.id}
                  id={_todo.id}
                  name={_todo.name}
                  initialIsCompleted={_todo.isCompleted}
                  handleUpdateComplete={handleUpdateComplete}
                />
              ))}
            {!todoList?.length && (
              <div className="size-full flex justify-center items-center">
                <Image
                  src={width < 600 ? TodoSmall : TodoLarge}
                  alt="todo-list-none"
                />
              </div>
            )}
          </ul>
          <ul className={`w-full ${width > 1200 ? "ml-1" : ""}`}>
            <Image src={DoneLabel} alt="done-label" className="mt-10" />
            {!!doneList?.length &&
              doneList?.map((_todo) => (
                <CheckList
                  key={_todo.id}
                  id={_todo.id}
                  name={_todo.name}
                  initialIsCompleted={_todo.isCompleted}
                  handleUpdateComplete={handleUpdateComplete}
                />
              ))}
            {!doneList?.length && (
              <div className="size-full flex justify-center items-center">
                <Image
                  src={width < 600 ? DoneSmall : DoneLarge}
                  alt="done-list-none"
                />
              </div>
            )}
          </ul>
        </div>
      </main>
    )
  );
}
