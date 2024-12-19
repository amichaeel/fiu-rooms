import React, { useState, useEffect } from "react";
import Building from "@/components/Building";
import ErrorIcon from "@mui/icons-material/Error";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import { buildings } from "@/utils/buildings";
import Garage from "@/components/Garage";
import { Clock } from "lucide-react";
import { MarginTwoTone } from "@mui/icons-material";
import MaintenancePage from "@/components/Maintenance";

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
    <div className="flex flex-col items-center justify-center">


      <section className="md:mt-20 mt-28 w-full max-w-md items-center justify-center p-2">

        <MaintenancePage />
        {/* <label className="input flex items-center gap-2 rounded-md bg-base-content/5">
          <input
            type="text"
            className="grow bg-transparent !outline-none placeholder-base-content/60"
            placeholder="Filter buildings"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <FilterAltIcon className="text-base-content/60" />
        </label>
      </section>
      <section
        id="buildings"
        className="grid w-full max-w-screen-xl grid-cols-1 gap-3 px-2 pt-6 md:grid-cols-2 lg:grid-cols-3"
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
        )} */}
      </section>
    </div>
  );
};