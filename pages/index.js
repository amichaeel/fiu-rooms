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
    "Ambulatory Care Center",
    "Academic Health Center 1",
    "Academic Health Center 2",
    "Academic Health Center 3",
    "Academic Health Center 4",
    "Academic Health Center 5",
    "Digital Art Studio",
    "Stocker Astroscience Center",
    "Infinity Insurance Park",
    "Bike Shop",
    "Building Ten",
    "Computing, Arts, Sciences and Education",
    "College of Business Complex",
    "Children's Creative Learning Center",
    "Carlos Finlay Elementary School",
    "Chemistry & Physics",
    "Campus Support Complex",
    "Duplication Center",
    "Deuxieme Maison",
    "Engineering Phase I",
    "Everglades Hall",
    "FIU Stadium",
    "Patricia & Phillip Frost Art Museum",
    "Field Support building",
    "Ernest R. Graham Center",
    "Steven and Dorothea Green Library",
    "Labor Center",
    "Lakeview Halls",
    "Management and New Growth Opportunities Building",
    "Management and Advanced Research Center",
    "National Hurricane Center",
    "Ocean Bank Convocation Center",
    "Owa Ehan",
    "Charles E. Perry Bldg. (Primera Casa)",
    "Paul L. Cejas School of Architecture",
    "Gold Parking Garage",
    "Blue Parking Garage",
    "Panther Parking Garage",
    "Red Parking Garage",
    "PG5 Market Station",
    "Parking Garage 6",
    "Panther Hall",
    "Parkview Hall",
    "Ryder Business Building",
    "Rafael Diaz-Balart Hall",
    "Ronald W. Reagan Presidential House",
    "Student Athletic Academic Center",
    "Student Academic Success Center",
    "Solar House",
    "Student Health Center",
    "Steven J. Green School of International and Public Affairs",
    "Sigma Phi Epsilon Learning Center",
    "Tamiami Hall",
    "Tower/Veteran and Military Affairs",
    "Trish and Dan Bell Chapel",
    "University Apartments",
    "University Tower",
    "Viertes Haus",
    "Wellness and Recreation Center",
    "West 1 - Sculpture + Art Foundation",
    "West 01C - Ceramics",
    "West 3 - Key Control",
    "West 6 - Training Lab",
    "West 9 - Painting",
    "West 10 - Drawing + MFA Studios",
    "ROTC - Reserve Officer Training Corps",
    "Trailer",
    "Wertheim Conservatory",
    "Herbert and Nicole Wertheim Performing Arts Center",
    "Women’s Softball/Tennis Center",
    "Sanford L. Ziff Family Education Building"];

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
            <div key={i} onClick={() => handleBuildingClick(b)} className="text-black group/building grid grid-cols-2 gap-2 items-center justify-between text-xs border border-black p-2 cursor-pointer hover:bg-gray-700">
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