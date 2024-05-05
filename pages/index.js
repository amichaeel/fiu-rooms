import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Building from "@/components/Building";
import ErrorIcon from "@mui/icons-material/Error";
import FilterAltIcon from "@mui/icons-material/FilterAlt";

export default function Home() {
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
    // "Everglades Residence Hall",
    "Engineering Center",
    "Patricia&PhilipFrostMuseum",
    "Graham Center",
    "Green Library",
    // "Labor Center",
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
    // "Wertheim Prf Arts Ctr",
  ].sort();

  const [search, setSearch] = useState("");
  const [filteredBuildings, setFilteredBuildings] = useState(buildings);
  const [achknowledge, setAchknowledge] = useState(false);

  useEffect(() => {
    const filtered = buildings.filter((building) =>
      building.toLowerCase().includes(search.toLowerCase()),
    );
    setFilteredBuildings(filtered);
  }, [search]);

  return (
    <div className="flex flex-col items-center justify-center">
      {/* <section className="w-full mt-20">
        <div className="flex md:flex-col items-center justify-center w-full h-16">
          <div className="text-gray-900 flex md:flex-row mx-16 flex-col space-x-2 items-center">
            <span className="font-monumentExtended dark:text-slate-100">find open rooms</span>
            <span className="font-monumentExtended text-[rgb(182,134,44)]"> anywhere </span>
            <span className="font-monumentExtended dark:text-slate-100">on campus</span>
          </div>
        </div>
      </section> */}
      <section className="mt-20 w-full max-w-md items-center justify-center p-2">

        <label className="input-md flex items-center  gap-2 rounded-md bg-neutral-200/60 dark:bg-[#353941]">
          <input
            type="text"
            className="grow bg-transparent !outline-none"
            placeholder="Filter buildings"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FilterAltIcon />
        </label>
        {/* <span className="flex justify-start text-slate-400 text-[9px] uppercase pt-2">Filter by buildings</span> */}
      </section>
      <div className={"w-full p-6 max-w-6xl " + (achknowledge && " hidden")}>
        <div role="alert" className="alert">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6 "><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>FIU Rooms has been updated with the summer 2024 schedule!</span>
          <div>
            <button onClick={() => setAchknowledge(true)} className="btn btn-sm btn-primary">Got it!</button>
          </div>
        </div>
      </div>
      <section
        id="buildings"
        className="grid w-full max-w-6xl grid-cols-1 gap-2 px-2 pt-6 md:grid-cols-2 lg:grid-cols-3"
      >

        {filteredBuildings.length > 0 ? (
          filteredBuildings.map((b, i) => {
            return <Building key={i} building={b} />;
          })
        ) : (
          <div className="col-span-full flex items-center justify-center space-x-2 text-sm uppercase opacity-60">
            <ErrorIcon />
            <span>No buildings found</span>
          </div>
        )}
      </section>
    </div>
  );
}
