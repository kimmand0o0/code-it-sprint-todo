"use client";

import {
  Dispatch,
  FC,
  KeyboardEvent,
  SetStateAction,
  useEffect,
  useState,
} from "react";

import PlusWhite from "@/app/assets/icons/plus-white.svg";
import PlusSlate from "@/app/assets/icons/plus-slate.svg";

import Button from "@/app/components/button";
import { ITodo } from "@/app/page";
import { addTodo } from "@/app/api/actions";

interface SearchProps {
  initialTodos: ITodo[];
  setTodos: Dispatch<SetStateAction<ITodo[]>>;
}

const Search: FC<SearchProps> = ({ initialTodos, setTodos }) => {
  const [isActive, setIsActive] = useState<boolean>(false);
  const [text, setText] = useState<string>("");
  const todos = initialTodos || [];

  const activeEnter = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      handleCreateTodo();
    }
  };

  const handleCreateTodo = async () => {
    try {
      const data = await addTodo(text);

      setTodos([...todos, data]);
      setText("");
    } catch (error) {
      alert("업로드에 실패하였습니다! 다시 시도해주세요!");
    }
  };

  useEffect(() => {
    if (text.length > 0) setIsActive(true);
    if (text.length === 0) setIsActive(false);
  }, [text]);

  return (
    <div className="w-full flex flex-row justify-between">
      <input
        value={text}
        onKeyDown={(event) => activeEnter(event)}
        onChange={(event) => setText(event.target.value)}
        className="w-full h-14 rounded-3xl border-2 bg-slate-100 px-6 border-slate-900 drop-shadow mr-5 outline-none"
        placeholder="할 일을 입력해주세요"
      />
      <Button
        type={"search"}
        onClick={handleCreateTodo}
        style={
          isActive ? "bg-violet-600 text-white" : "bg-slate-200 text-slate-900"
        }
        icon={isActive ? PlusWhite : PlusSlate}
      >
        추가하기
      </Button>
    </div>
  );
};

export default Search;
