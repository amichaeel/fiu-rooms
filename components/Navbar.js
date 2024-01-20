import React from "react";
import Image from "next/image";
import FIULogo from "@/public/images/fiu-logo.png"
import { useRouter } from "next/router";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="flex justify-center w-full border-b border-gray-900 h-12 bg-white">
      <div className="flex items-center justify-between w-full max-w-5xl">
        <div onClick={() => router.push("/")} className="flex space-x-2 items-center cursor-pointer">
          <Image className="object-contain h-8 w-fit pl-2" src={FIULogo} alt="FIU Logo" />
          <span className="text-gray-700 md:text-3xl text-xl font-semibold">Rooms</span>
        </div>
        <div className="flex flex-row uppercase">
          <div
            className="flex cursor-pointer items-center justify-center md:p-3 p-2 text-xs text-gray-700 hover:text-white h-12 hover:bg-gray-700 border-l border-gray-700 md:last:border-r ">
            Search</div>
          <div
            className="flex cursor-pointer items-center justify-center md:p-3 p-2 text-xs text-gray-700 hover:text-white h-12 hover:bg-gray-700 border-l border-gray-700 md:last:border-r">
            Leave Feedback</div>
        </div>
      </div>
    </nav>

  )
}