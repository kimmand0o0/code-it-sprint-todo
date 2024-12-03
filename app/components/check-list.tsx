"use client";

import { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import CheckboxDefault from "@/app/assets/icons/checkbox-default.svg";
import CheckboxFrame from "@/app/assets/icons/checkbox-frame.svg";

interface CheckListProps {
  id: number;
  name: string;
  initialIsCompleted: boolean;
  handleUpdateComplete: (id: number, isCompleted: boolean) => Promise<void>;
}

const CheckList: FC<CheckListProps> = ({
  id,
  name,
  initialIsCompleted,
  handleUpdateComplete,
}) => {
  const [isCompleted, setIsCompleted] = useState<boolean>(initialIsCompleted);

  return (
    <Link
      href={`/items/${id}`}
      className={`${isCompleted ? "bg-violet-100 line-through" : "bg-white"} h-[50px] p-2 mt-3 rounded-[27px] border-2 border-slate-900 flex justify-start items-center text-[16px] text-slate-800`}
    >
      <button
        onClick={(event) => {
          event.preventDefault();
          event.stopPropagation();

          handleUpdateComplete(id, !isCompleted);
          setIsCompleted(!isCompleted);
        }}
        className="mr-2"
      >
        <Image
          src={isCompleted ? CheckboxFrame : CheckboxDefault}
          alt="checkbox"
        />
      </button>
      <span>{name}</span>
    </Link>
  );
};

export default CheckList;
