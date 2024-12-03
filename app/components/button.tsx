"use client";

import { FC, MouseEventHandler, ReactNode } from "react";
import Image from "next/image";

import useWindowWidth from "@/app/utils/getWindowWidth";

interface ButtonProps {
  type?: "search" | null;
  icon: any;
  style: string;
  children: ReactNode;
  onClick: MouseEventHandler;
}

const Button: FC<ButtonProps> = ({
  type = null,
  onClick,
  children,
  style,
  icon,
}) => {
  const width = useWindowWidth() || 1200;

  return (
    <button
      onClick={onClick}
      className={`${style} ${width > 600 || !type ? "px-14" : "px-5"} ${!type && "mx-2 py-2.5"} rounded-3xl border-2 border-slate-900 drop-shadow font-bold text-[18px]`}
    >
      <div className="w-full min-w-4 whitespace-nowrap flex flex-row justify-center items-center">
        <Image
          src={icon}
          alt="button-icon"
          className={width > 600 || !type ? "mr-2" : ""}
        />
        {(width > 600 || !type) && <span>{children}</span>}
      </div>
    </button>
  );
};

export default Button;
