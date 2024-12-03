import axios from "axios";
import { ITodo } from "@/app/page";

export const getTodos = async () => {
  const { data } = await axios.get(
    "https://assignment-todolist-api.vercel.app/api/kimmandoo/items?page=1&pageSize=10",
  );

  return data;
};

export const getTodoById = async (id: number) => {
  const { data } = await axios.get(
    `https://assignment-todolist-api.vercel.app/api/kimmandoo/items/${id}`,
  );

  return data;
};

export const updateComplete = async (data: ITodo) => {
  await axios.patch(
    `https://assignment-todolist-api.vercel.app/api/kimmandoo/items/${data.id}`,
    {
      name: data.name,
      memo: data.memo || "",
      imageUrl: data.imageUrl || "",
      isCompleted: data.isCompleted,
    },
  );
};

export const addTodo = async (name: string) => {
  const { data } = await axios.post(
    "https://assignment-todolist-api.vercel.app/api/kimmandoo/items",
    {
      name,
    },
  );

  return data;
};

export const updateMemo = async (data: ITodo) => {
  await axios.patch(
    `https://assignment-todolist-api.vercel.app/api/kimmandoo/items/${data.id}`,
    {
      name: data.name,
      memo: data.memo || "",
      imageUrl: data.imageUrl || "",
      isCompleted: data.isCompleted,
    },
  );
};

export const deleteTodo = async (id: number) => {
  await axios.delete(
    `https://assignment-todolist-api.vercel.app/api/kimmandoo/items/${id}`,
  );
};

export const updateImage = async (formData: FormData) => {
  const {
    data: { url },
  } = await axios.post(
    "https://assignment-todolist-api.vercel.app/api/kimmandoo/images/upload",
    formData,
    {
      headers: {
        "Content-Type": "multipart/form-data",
        accept: "application/json",
      },
    },
  );

  return url;
};

export const updateImgUrl = async (todo: ITodo) => {
  await axios.patch(
    `https://assignment-todolist-api.vercel.app/api/kimmandoo/items/${todo.id}`,
    {
      name: todo.name,
      memo: todo.memo,
      imageUrl: todo.imageUrl,
      isCompleted: todo.isCompleted,
    },
  );
};
