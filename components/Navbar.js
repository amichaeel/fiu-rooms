import React from "react";
import Image from "next/image";
import FIULogo from "@/public/images/fiu-logo.png"
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHamburger, faSearch } from "@fortawesome/free-solid-svg-icons";

export default function Navbar() {
  const router = useRouter();
  return (
    <nav className="flex items-center justify-between fixed top-0 w-full h-14 border-black border-b backdrop-blur-lg">

      <div className="flex items-center h-full">
        <div className="flex items-center px-6 border-x border-black h-full hover:bg-[rgb(8,30,63)] hover:text-white">
          <FontAwesomeIcon icon={faBars} />
        </div>
        <div onClick={() => router.push("/")} className="h-full cursor-pointer md:border-r border-black md:px-8 pl-4 flex justify-center items-center">
          <div className="flex items-center space-x-2">
            <span className="font-monumentExtended text-lg font-black">FIU ROOMS</span>
          </div>
        </div>
      </div>

      <div className="h-full flex space-x-4 flex-row items-center">
        <div className="md:inline hidden">
          leave feedback
        </div>
        <div className="flex cursor-pointer items-center space-x-2 border-x border-black h-full px-2 font-monumentExtended text-white bg-[rgb(8,30,63)] hover:bg-[rgb(182,134,44)] transition">
          <FontAwesomeIcon icon={faSearch} />
          <span>SEARCH</span>
        </div>
      </div>
    </nav>

  )
}