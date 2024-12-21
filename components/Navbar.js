import React from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import { Sun, Moon, CarIcon, Menu, BookOpen, Map, Mail, Coffee, GithubIcon } from 'lucide-react';

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Navbar() {
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    document.documentElement.classList.toggle('dark');
  };

  return (
    <div className="navbar w-full flex items-center justify-center">
      {/* Mobile Layout */}
      <div className="navbar fixed z-50 text-base-content backdrop-blur-lg md:hidden">
        <div className="flex-none">
          <label htmlFor="nav-drawer" className="btn btn-ghost drawer-button">
            <Menu className="h-5 w-5" />
          </label>
        </div>
        <div className="flex-1">
          <Link className="btn btn-ghost" href="/">
            <span className="font-monumentExtended text-lg">FIU ROOMS</span>
          </Link>
        </div>
        <div className="flex-none">
          <button
            onClick={toggleTheme}
            className="btn btn-ghost btn-circle"
            aria-label="Toggle theme"
          >
            <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
            <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </button>
        </div>
      </div>

      {/* Drawer */}
      <div className="drawer md:hidden">
        <input id="nav-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-side z-[60]">
          <label htmlFor="nav-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
          <ul className="menu p-4 w-80 min-h-full bg-primary text-base-content">
            {/* Drawer content */}
            <li className="menu-title font-bold">Navigation</li>
            <li>
              <Link href="/parking">
                <CarIcon />
                Parking
              </Link>
            </li>
            <li>
              <Link href="/courses">
                <BookOpen />
                Courses
              </Link>
            </li>
            <li>
              <Link href="/map">
                <Map />
                Campus Map
              </Link>
            </li>
            <li className="menu-title font-bold mt-4">Links</li>
            <li>
              <Link href="https://buymeacoffee.com/anthonyham">
                <Coffee />
                Buy Me a Coffee
              </Link>
            </li>
            <li>
              <Link href="https://www.github.com/amichaeel/fiu-rooms">
                <GithubIcon />
                GitHub Repository
              </Link>
            </li>
            <li>
              <Link href="mailto:mail@anthonymham.com">
                <Mail />
                Email Me
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Desktop Layout */}
      <div className="navbar max-w-screen-xl fixed z-50 text-base-content backdrop-blur-lg hidden md:flex">
        <div className="flex w-full items-center justify-between">
          <Link className="font-bold" href="/">
            <span className="font-monumentExtended text-lg">FIU ROOMS</span>
          </Link>

          <div className="flex items-center gap-2">
            {/* Navigation Links */}
            <div className="tooltip tooltip-bottom [--tooltip-color:#FFFFFF] [--tooltip-text-color:#000000] dark:[--tooltip-text-color:#FFFFFF] dark:[--tooltip-color:#000000]" data-tip="Parking">
              <Link href="/parking" className="btn btn-ghost btn-sm btn-circle">
                <CarIcon className="h-4 w-4 " />
              </Link>
            </div>

            <div className="tooltip tooltip-bottom [--tooltip-color:#FFFFFF] [--tooltip-text-color:#000000] dark:[--tooltip-text-color:#FFFFFF] dark:[--tooltip-color:#000000]" data-tip="Courses">
              <Link href="/courses" className="btn btn-ghost btn-sm btn-circle">
                <BookOpen className="h-4 w-4" />
              </Link>
            </div>

            <div className="tooltip tooltip-bottom [--tooltip-color:#FFFFFF] [--tooltip-text-color:#000000] dark:[--tooltip-text-color:#FFFFFF] dark:[--tooltip-color:#000000]" data-tip="Map">
              <Link href="/map" className="btn btn-ghost btn-sm btn-circle">
                <Map className="h-4 w-4 " />
              </Link>
            </div>

            <div className="tooltip tooltip-bottom [--tooltip-color:#FFFFFF] [--tooltip-text-color:#000000] dark:[--tooltip-text-color:#FFFFFF] dark:[--tooltip-color:#000000]" data-tip="Buy me a Coffee :)">
              <Link href="https://buymeacoffee.com/anthonyham" className="btn btn-ghost btn-sm btn-circle">
                <Coffee className="h-4 w-4 " />
              </Link>
            </div>


            <div className="tooltip tooltip-bottom [--tooltip-color:#FFFFFF] [--tooltip-text-color:#000000] dark:[--tooltip-text-color:#FFFFFF] dark:[--tooltip-color:#000000]" data-tip="GitHub">
              <Link href="https://www.github.com/amichaeel/fiu-rooms" className="btn btn-ghost btn-sm btn-circle">
                <GithubIcon className="h-4 w-4 " />
              </Link>
            </div>

            <div className="tooltip tooltip-bottom [--tooltip-color:#FFFFFF] [--tooltip-text-color:#000000] dark:[--tooltip-text-color:#FFFFFF] dark:[--tooltip-color:#000000]" data-tip="Email Me">
              <Link href="mailto:mail@anthonymham.com" className="btn btn-ghost btn-sm btn-circle">
                <Mail className="h-4 w-4 " />
              </Link>
            </div>

            <button
              onClick={toggleTheme}
              className="btn btn-ghost btn-sm btn-circle"
              aria-label="Toggle theme"
            >
              <Sun className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100 " />
            </button>
          </div>
        </div>
      </div>
    </div >
  );
}