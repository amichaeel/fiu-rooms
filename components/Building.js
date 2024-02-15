import React, { useEffect, useState } from "react";
import { transformClassesToSchedule, isRoomInUse } from "@/utils/scheduleUtils";
import { MoonLoader } from "react-spinners";
import { useRouter } from "next/router";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function Building({ building }) {
  const [isLoading, setIsLoading] = useState(true);
  const [availability, setAvailability] = useState([]);
  const router = useRouter();

  const handleBuildingClick = async (b) => {
    router.push(`/${b}`);
  };

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

        const newAllRoomsStatus = Object.entries(transformSchedule).reduce(
          (acc, [room, schedule]) => {
            acc[room] = isRoomInUse(schedule, new Date());
            return acc;
          },
          {},
        );

        // Calculating availability based on the new allRoomsStatus
        const tempAvailability = [0, 0];
        for (const inUse of Object.values(newAllRoomsStatus)) {
          if (!inUse[0]) {
            tempAvailability[0] += 1;
          }
          tempAvailability[1] += 1;
        }
        setAvailability(tempAvailability);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    load();
  }, [building]);

  return (
    <div
      onClick={() => handleBuildingClick(building)}
      className="group/building flex h-[100px] cursor-pointer flex-row items-center justify-between space-x-6 rounded-md bg-neutral-200/60 p-4 text-black transition hover:bg-neutral-300 dark:bg-[#353941] dark:hover:bg-[#4d525d]"
    >
      <div className="text-md text-slate-900 dark:text-slate-300">
        {building}
      </div>
      {isLoading ? (
        <div className="justify-self-end text-xs">
          <MoonLoader speedMultiplier={0.7} color="rgb(0,0,0)" size={35} />
        </div>
      ) : (
        <div className="flex items-center justify-center text-xs font-semibold text-blue-900 dark:text-slate-300 ">
          <div
            className="radial-progress"
            style={{
              "--value": ((availability[0] / availability[1]) * 100) >> 0,
              "--size": "4rem",
            }}
            role="progressbar"
          >
            {((availability[0] / availability[1]) * 100) >> 0}%
          </div>
          <ChevronRightIcon className="ml-3" />
        </div>
      )}
    </div>
  );
}
