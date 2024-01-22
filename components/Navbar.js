import React, { useState } from "react";
import Menu from "./Menu";
import Image from "next/image";
import FIULogo from "@/public/images/fiu-logo.png"
import { useRouter } from "next/router";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faHamburger, faSearch } from "@fortawesome/free-solid-svg-icons";
import { Transition } from '@headlessui/react'
import Link from "next/link";

export default function Navbar() {
  const [openMenu, setOpenMenu] = useState(false);
  const router = useRouter();

  return (
    <>
      <Transition
        show={openMenu}
        enter="transition ease-out duration-200 transform"
        enterFrom="-translate-y-full"
        enterTo="translate-y-0"
        leave="transition ease-in duration-200 transform"
        leaveFrom="translate-y-0"
        leaveTo="-translate-y-full"
        className="w-full fixed top-0 text-white bg-[rgb(8,30,63)]"
      >
        <div className="flex flex-col">
          <div className="m-7"></div>
          <div className="flex flex-col space-y-4 p-6">
            <Link href="/" className="p-4 cursor-pointer text-4xl w-fit transition-all duration-300 hover:text-[rgb(182,134,44)]">open rooms</Link>
            <Link href="https://www.github.com/amichaeel" className="p-4 cursor-pointer text-4xl w-fit transition-all duration-300 hover:text-[rgb(182,134,44)]">github</Link>
            <span className="text-x p-4 font-thin">This app is in beta. More features to come!</span>
          </div>
        </div>
      </Transition>
      <div>
        <nav className="flex items-center justify-between translate fixed top-0 w-full h-14 border-black border-b bg-white/90 backdrop-blur-lg">
          <div className="flex items-center h-full">
            <div onClick={() => setOpenMenu(!openMenu)} className={`flex items-center cursor-pointer px-6 border-x border-black h-full hover:bg-[rgb(8,30,63)] hover:text-white ` + (openMenu && "bg-[rgb(8,30,63)] text-white")}>
              <FontAwesomeIcon icon={faBars} />
            </div>
            <div onClick={() => router.push("/")} className="h-full cursor-pointer md:border-r border-black md:px-8 pl-4 flex justify-center items-center">
              <div className="flex items-center space-x-2">
                <span className="font-monumentExtended text-lg font-black">FIU ROOMS</span>
              </div>
            </div>
          </div>

          <div className="h-full flex space-x-4 flex-row items-center">
            {/* <div className="md:inline hidden cursor-pointer transition-all duration-300 hover:text-[rgb(182,134,44)]">
              login
            </div>
            <div className="md:inline hidden cursor-pointer transition-all duration-300 hover:text-[rgb(182,134,44)]">
              sign up
            </div> */}
            <div className="flex cursor-pointer items-center space-x-2 border-x border-black h-full px-4 font-monumentExtended text-white bg-[rgb(8,30,63)] hover:bg-[rgb(182,134,44)] transition">
              {/* <FontAwesomeIcon icon={faSearch} /> */}
              <span className="text-sm">BETA</span>
            </div>
          </div>
        </nav>
      </div>
    </>
  )
}