import React, { useState, useEffect, useRef } from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Navbar() {
  return (
    <>
      <div className="navbar fixed z-50 text-slate-700 backdrop-blur-lg dark:text-slate-100">
        <div className="navbar-start">
          <div className="dropdown">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </div>
            {/* <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
              <li><Link href="/">Homepage</Link></li>
              <li><Link href="https://www.github.com/amichaeel">Github</Link></li>
            </ul> */}
          </div>
        </div>
        <div className="navbar-center">
          <Link className="btn btn-ghost" href="/">
            <div className="relative flex flex-col items-center justify-center">
              <span className="font-monumentExtended text-xl">FIU ROOMS</span>
              <span className="text-[10px] font-light">BETA</span>
            </div>
          </Link>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <Link href="https://www.github.com/amichaeel/fiu-rooms">
              <GitHubIcon />
            </Link>
          </button>
          <button className="btn btn-ghost btn-circle">
            <Link href="mailto:mail@anthonymham.com">
              <EmailIcon />
            </Link>
          </button>
        </div>
      </div>
    </>
  );
}
