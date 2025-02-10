import React, { useState, useEffect } from "react";
import Building from "@/components/Building";
import ErrorIcon from "@mui/icons-material/Error";
import { Info, Search } from "lucide-react";
import { buildings } from "@/utils/buildings";
import { CircleAlert } from "lucide-react";

export default function Home() {
  const [search, setSearch] = useState("");
  const [filteredBuildings, setFilteredBuildings] = useState(buildings);
  const [achknowledge, setAchknowledge] = useState(false);

  const handleAchknowledge = () => {
    localStorage.setItem("milton", true);
    setAchknowledge(true);
  };

  useEffect(() => {
    const filtered = buildings.filter((building) =>
      building.toLowerCase().includes(search.toLowerCase())
    );
    setFilteredBuildings(filtered);
  }, [search]);

  useEffect(() => {
    if (localStorage.getItem("milton", true)) {
      setAchknowledge(true);
    }
  }, []);

  return (
    <div className="flex flex-col items-center px-2 py-2 justify-center">

      <section className="w-full border bg-base-content/5 border-base-content/10 rounded-md flex items-center gap-4 p-4 max-w-screen-xl">
        <CircleAlert className="h-16 w-16 md:h-6 md:w-6" />
        <p className="text-xs">
          Did your class change rooms? Email me at <a href="mailto:mail@anthonymham.com" className="underline">mail@anthonymham.com</a> to submit a room change.
        </p>
      </section>

      <section className="w-full flex max-w-screen-xl py-4 items-center justify-center">
        <label className="input-md flex w-full items-center border border-base-content/10 rounded-md bg-base-content/5">
          <Search size={15} className="text-base-content/60 mr-2" />
          <input
            type="text"
            className="grow bg-transparent !outline-none placeholder-base-content/60"
            placeholder="Search buildings"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>

        <div className="dropdown dropdown-left px-4">
          <div tabIndex={0} role="button" className="btn btn-sm p-0 btn-ghost m-1"><Info /></div>
          <div
            tabIndex={0}
            className="dropdown-content backdrop-blur-lg rounded-md border border-base-content/50 shadow-xl card card-compact text-primary-content z-[1] w-64 p-2">
            <div className="card-body text-base-content">
              <h3 className="card-title">Please note:</h3>
              <ul className="list list-disc pl-5">
                <li>Displayed availability only reflects official class schedules.</li>
                <li>Rooms may be occupied by club meetings or study groups.</li>
                <li>Some rooms may be locked by FIU staff.</li>
              </ul>
            </div>
          </div>
        </div>

      </section>
      <section
        id="buildings"
        className="grid w-full max-w-screen-xl grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3"
      >
        {filteredBuildings.length > 0 ? (
          filteredBuildings.map((b, i) => {
            return <Building key={i} building={b} />;
          })
        ) : (
          <div className="col-span-full flex items-center justify-center space-x-2 text-sm uppercase text-base-content/60">
            <ErrorIcon />
            <span>No buildings found</span>
          </div>
        )}
      </section>
    </div>
  );
};