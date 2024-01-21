import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";

export default function Home() {

  const router = useRouter();

  const handleBuildingClick = async (b) => {
    router.push(`/${b}`)
  }

  const buildings = [
    "Academic Health Center 2",
    "Academic Health Center 3",
    "Academic Health Center 4",
    "Academic Health Center 5",
    "Art Studio",
    "Stocker Astroscience Center",
    "Comp, Arts, Sci & Educat",
    "College of Business Complex",
    "Chem & Physics",
    "Deuxieme Maison",
    "Everglades Hall",
    "Engineering Center",
    "Patricia&PhilipFrostMuseum",
    "Graham Center",
    "Green Library",
    "Labor Center",
    "Mgmt and New Growth Opp",
    "Mgmt & Advanced Resrch Ctr",
    "Ocean Bank Convoc Center",
    "Owa Ehan",
    "Charles E. Perry",
    "Paul Cejas Architecture",
    "Panther Parking Garage",
    "Red Parking Garage",
    "PG5 Market Station",
    "Parking Garage 6",
    "Ryder Business",
    "Sch. Inter.&Public Affairs",
    "Viertes Haus",
    "West 1",
    "West 9",
    "West 10",
    "Wertheim Prf Arts Ctr"];

  return (
    <>
      <section className="w-full mt-20 ">
        <div className="flex md:flex-col items-center justify-center w-full h-16 ">
          <div className="text-gray-900 flex md:flex-row mx-16 flex-col space-x-2 items-center">
            <span className="font-monumentExtended">find open rooms</span>
            <span className="font-monumentExtended text-[rgb(182,134,44)]"> anywhere </span>
            <span className="font-monumentExtended">on campus</span>
          </div>
        </div>
      </section>
      <section id="buildings" className="max-w-xl mx-auto grid md:grid-cols-2 grid-cols-1 gap-2 pt-6 px-2">
        {buildings.map((b, i) => {
          return (
            <div key={i} onClick={() => handleBuildingClick(b)} className="text-black group/building grid grid-cols-2 gap-2 items-center justify-between text-xs border border-black p-2 cursor-pointer hover:bg-[rgb(8,30,63)]">
              <span className="text-slate-900 text-sm group-hover/building:text-slate-100 justify-self-start">{b}</span>
              <span className="font-light text-xs text-blue-900 group-hover/building:text-slate-100 justify-self-end">3/12
                OPEN</span>
            </div>
          )
        })}
      </section>
    </>
  )
}