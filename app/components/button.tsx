'use client'

import { FC, MouseEventHandler, ReactNode } from "react";
import Image from "next/image";

import useWindowWidth from "@/app/utils/getWindowWidth";

interface ButtonProps {
  icon : any;
  style : string;
  children : ReactNode
  onClick : MouseEventHandler;
}

const Button : FC<ButtonProps> = ({ onClick, children, style, icon }) => {
  return (
    <button
      onClick={onClick}
      className={`${style} ${useWindowWidth() > 600 ? 'px-14' : 'px-5'} rounded-3xl border-2 border-slate-900 drop-shadow font-bold text-[18px]`}
    >
      <div className="w-full min-w-4 whitespace-nowrap flex flex-row justify-center items-center">
        <Image src={icon} alt="button-icon" className={useWindowWidth() > 600 ? 'mr-2' : ''}/>
        {useWindowWidth() > 600 && <span>{children}</span>}
      </div>
    </button>
  );
};

export default Button;
