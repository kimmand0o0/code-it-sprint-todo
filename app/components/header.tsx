"use client";

import { FC } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import LogoLarge from "@/app/assets/images/logo-large.svg";
import LogoSmall from "@/app/assets/images/logo-small.svg";

import useWindowWidth from "@/app/utils/getWindowWidth";

const Header: FC = () => {
  const router = useRouter();

  const width = useWindowWidth();

  return (
    <header className="fixed z-50 top-0 left-0 w-full h-[60px] bg-white border-slate-200 border-b-[1px] flex justify-center items-center">
      <div className={`body-wrapper ${width > 600 && "p-5"}`}>
        <button
          onClick={() => {
            router.push("/");
          }}
        >
          <Image src={width ? LogoSmall : LogoLarge} alt="logo-large" />
        </button>
      </div>
    </header>
  );
};

export default Header;
