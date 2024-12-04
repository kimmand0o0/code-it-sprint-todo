"use client";

import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import Image from "next/image";

import { ITodo } from "@/app/page";

import CheckboxDefault from "@/app/assets/icons/checkbox-default.svg";
import CheckboxFrame from "@/app/assets/icons/checkbox-frame.svg";

interface CheckListDetailProps {
  todo: ITodo | undefined;
  name: string;
  setName: Dispatch<SetStateAction<string>>;
  handleUpdateComplete: () => Promise<void>;
}

const CheckListDetail: FC<CheckListDetailProps> = ({
  todo,
  name,
  setName,
  handleUpdateComplete,
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>();

  useEffect(() => {
    setIsCompleted(todo?.isCompleted as boolean);
  }, [todo]);

  return (
    <div
      className={`${isCompleted ? "bg-violet-100" : "bg-white"} h-16 p-2 mt-3 rounded-3xl border-2 border-slate-900 flex justify-center items-center font-bold text-[16px] text-slate-900 underline`}
    >
      <button
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();

          handleUpdateComplete();
          setIsCompleted(true);
        }}
        className="mr-2"
      >
        <Image
          src={isCompleted ? CheckboxFrame : CheckboxDefault}
          alt="checkbox"
        />
      </button>
      <input
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="z-40 bg-transparent outline-none"
      />
    </div>
  );
};

export default CheckListDetail;
