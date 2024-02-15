import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useRouter } from "next/router";
import Building from "@/components/Building";
import ErrorIcon from '@mui/icons-material/Error';

export default function Home() {
  const router = useRouter();

  const buildings = [
    "Academic Health Center 2",
    "Academic Health Center 3",
    "Academic Health Center 4",
    "Academic Health Center 5",
    "Charles E. Perry",
    "Comp, Arts, Sci & Educat",
    "College of Business Complex",
    "Chem & Physics",
    "Deuxieme Maison",
    "Everglades Residence Hall",
    "Engineering Center",
    "Patricia&PhilipFrostMuseum",
    "Graham Center",
    "Green Library",
    "Labor Center",
    "Mgmt and New Growth Opp",
    "Mgmt & Advanced Resrch Ctr",
    "Ocean Bank Convoc Center",
    "Owa Ehan",
    "Paul Cejas Architecture",
    "PG5 Market Station",
    "Parking Garage 6",
    "Ryder Business",
    "Sch. Inter.&Public Affairs",
    "Stocker Astroscience Center",
    "Studio",
    "Viertes Haus",
    "West 1",
    "West 9",
    "West 10",
    "Wertheim Prf Arts Ctr"].sort();

  const [search, setSearch] = useState('');
  const [filteredBuildings, setFilteredBuildings] = useState(buildings);

  useEffect(() => {
    const filtered = buildings.filter(building =>
      building.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBuildings(filtered);
  }, [search]);

  return (
    <div className="flex flex-col justify-center items-center">
      <section className="w-full mt-20">
        <div className="flex md:flex-col items-center justify-center w-full h-16">
          <div className="text-gray-900 flex md:flex-row mx-16 flex-col space-x-2 items-center">
            <span className="font-monumentExtended dark:text-slate-100">find open rooms</span>
            <span className="font-monumentExtended text-[rgb(182,134,44)]"> anywhere </span>
            <span className="font-monumentExtended dark:text-slate-100">on campus</span>
          </div>
        </div>
      </section>
      <section className="w-full max-w-md items-center justify-center p-2 mt-5">
        <label className="input input-md dark:bg-[#353941] flex items-center gap-2">
          <input type="text" className="grow bg-transparent" placeholder="Search by buildings" value={search} onChange={e => setSearch(e.target.value)} />
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-4 h-4 opacity-70"><path fillRule="evenodd" d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z" clipRule="evenodd" /></svg>
        </label>
        {/* <span className="flex justify-start text-slate-400 text-[9px] uppercase pt-2">Filter by buildings</span> */}
      </section>
      <section id="buildings" className="max-w-6xl mx-auto grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-2 pt-6 px-2">
        {filteredBuildings.length > 0 ? filteredBuildings.map((b, i) => {
          return (
            <Building key={i} building={b} />
          )
        }) : (
          <div className="text-sm flex items-center space-x-2 justify-center uppercase opacity-60 col-span-full">
            <ErrorIcon />
            <span>No buildings found</span>
          </div>
        )}
      </section>
    </div>
  )
}