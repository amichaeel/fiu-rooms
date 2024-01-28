import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { faEnvelope } from "@fortawesome/free-regular-svg-icons";
import { Inter } from "next/font/google";
import Link from "next/link";

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function Navbar() {
  return (
    <>
      <div className="navbar backdrop-blur-lg fixed z-50">
        <div className="navbar-start">
          <div className="dropdown">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h7" /></svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link href="/">Homepage</Link></li>
              <li><Link href="https://www.github.com/amichaeel">Github</Link></li>
            </ul>
          </div>
        </div>
        <div className="navbar-center">
          <Link className="btn btn-ghost" href="/">
            <span className="font-monumentExtended text-xl">FIU ROOMS</span>
            <span className="text-xs font-base font-thin">BETA</span>
          </Link>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <FontAwesomeIcon icon={faSearch} className="text-base" />
          </button>
          <button className="btn btn-ghost btn-circle">
            <Link href="mailto:mail@anthonymham.com"><FontAwesomeIcon icon={faEnvelope} className="text-base" /></Link>
          </button>
        </div>
      </div>
    </>
  )
}