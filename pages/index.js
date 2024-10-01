import React, { useState, useEffect } from "react";
import Building from "@/components/Building";
import ErrorIcon from "@mui/icons-material/Error";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { buildings } from "@/utils/buildings";

export default function Home() {
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
      </section>
      {/* <div className={"w-full p-6 max-w-6xl " + (achknowledge && " hidden")}>
        <div role="alert" className="alert flex justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-info shrink-0 w-6 h-6"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <span>FIU Rooms has been updated with the Fall 2024 Schedule</span>
          <div>
            <button onClick={() => setAchknowledge(true)} className="btn btn-sm btn-primary">Got it!</button>
          </div>
        </div>
      </div> */}
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
