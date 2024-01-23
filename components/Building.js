import React, { useEffect, useState } from "react";
import { transformClassesToSchedule, isRoomInUse } from "@/utils/scheduleUtils";
import { PulseLoader } from "react-spinners";
import { useRouter } from "next/router";


export default function Building({ building }) {
  const [isLoading, setIsLoading] = useState(true)
  const [availability, setAvailability] = useState([])
  const router = useRouter();

  const handleBuildingClick = async (b) => {
    router.push(`/${b}`)
  }

  useEffect(() => {
    const load = async () => {
      if (!building) {
        return;
      }

      try {
        const uri = `/api/building?building=${building}`;
        const response = await fetch(uri);
        const data = await response.json();

        const transformSchedule = transformClassesToSchedule(data);

        const newAllRoomsStatus = Object.entries(transformSchedule).reduce((acc, [room, schedule]) => {
          acc[room] = isRoomInUse(schedule, new Date());
          return acc;
        }, {});

        // Calculating availability based on the new allRoomsStatus
        const tempAvailability = [0, 0];
        for (const inUse of Object.values(newAllRoomsStatus)) {
          if (!inUse[0]) { tempAvailability[0] += 1; }
          tempAvailability[1] += 1;
        }
        setAvailability(tempAvailability);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [building]);

  return (
    <a href={`/${building}`} onClick={() => handleBuildingClick(building)} className="text-black group/building grid grid-cols-2 gap-2 items-center justify-between text-xs border border-black p-2 cursor-pointer hover:bg-[rgb(8,30,63)]">
      <span className="text-slate-900 text-sm group-hover/building:text-slate-100 justify-self-start">{building}</span>
      {isLoading ? (
        <div className="justify-self-end text-xs">
          <PulseLoader speedMultiplier={0.7} color="rgb(8,30,63,1)" size={10} />
        </div>
      ) : (
        <span className="font-light text-xs text-blue-900 group-hover/building:text-slate-100 justify-self-end">
          {availability[0]}/{availability[1]} OPEN
        </span>
      )}
    </a>
  )
}