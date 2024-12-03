"use client";

import { FC, useEffect, useState } from "react";
import Image from "next/image";

import { ITodo } from "@/app/page";

import CheckboxDefault from "@/app/assets/icons/checkbox-default.svg";
import CheckboxFrame from "@/app/assets/icons/checkbox-frame.svg";

interface CheckListDetailProps {
  todo: ITodo | undefined;
  handleUpdateComplete: () => Promise<void>;
}

const CheckListDetail: FC<CheckListDetailProps> = ({
  todo,
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
        disabled={isCompleted}
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
      {todo?.name}
    </div>
  );
};

export default CheckListDetail;
