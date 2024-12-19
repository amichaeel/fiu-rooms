import React from "react";
import { Inter } from "next/font/google";
import Link from "next/link";
import EmailIcon from "@mui/icons-material/Email";
import GitHubIcon from "@mui/icons-material/GitHub";
import { CoffeeRounded } from "@mui/icons-material";
import MapIcon from "@mui/icons-material/Map";
import { Sun, Moon, CarIcon } from 'lucide-react';

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
    <div className="navbar fixed z-50 text-base-content backdrop-blur-lg">
      {/* Mobile Layout */}
      <div className="flex flex-col w-full md:hidden">
        <div className="flex-1">
          <Link className="btn btn-ghost" href="/">
            <span className="font-monumentExtended text-lg">FIU ROOMS</span>
          </Link>
        </div>
        <div className="flex gap-1">
          <Link href="/parking" className="btn btn-ghost btn-circle">
            <CarIcon />
          </Link>
          <Link href="https://buymeacoffee.com/anthonyham" className="btn btn-ghost btn-circle">
            <CoffeeRounded />
          </Link>
          <Link href="/map" className="btn btn-ghost btn-circle">
            <MapIcon />
          </Link>
          <Link href="https://www.github.com/amichaeel/fiu-rooms" className="btn btn-ghost btn-circle">
            <GitHubIcon />
          </Link>
          <Link href="mailto:mail@anthonymham.com" className="btn btn-ghost btn-circle">
            <EmailIcon />
          </Link>
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

      {/* Desktop Layout */}
      <div className="hidden w-full md:grid md:grid-cols-3">
        <div className="flex items-center justify-start">
          <Link href="https://buymeacoffee.com/anthonyham" className="btn btn-ghost btn-circle">
            <CoffeeRounded />
          </Link>
          <Link href="/map" className="btn btn-ghost btn-circle">
            <MapIcon />
          </Link>
          <Link href="/parking" className="btn btn-ghost btn-circle">
            <CarIcon />
          </Link>
        </div>

        <div className="flex items-center justify-center">
          <Link className="btn btn-ghost" href="/">
            <span className="font-monumentExtended text-lg">FIU ROOMS</span>
          </Link>
        </div>

        <div className="flex items-center justify-end">
          <Link href="https://www.github.com/amichaeel/fiu-rooms" className="btn btn-ghost btn-circle">
            <GitHubIcon />
          </Link>
          <Link href="mailto:mail@anthonymham.com" className="btn btn-ghost btn-circle">
            <EmailIcon />
          </Link>
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
    </div>
  );
}