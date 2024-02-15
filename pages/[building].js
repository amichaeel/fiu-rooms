import React, { useState, useEffect } from "react";
import Classroom from "@/components/Classroom";
import { isRoomInUse, transformClassesToSchedule } from "@/utils/scheduleUtils";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";

export default function Page() {
  const [allRoomsStatus, setAllRoomsStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const load = async () => {
      try {
        if (!router.query.building) {
          return;
        }
        const building = router.query.building;
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

        setAllRoomsStatus(newAllRoomsStatus);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setIsLoading(false);
      }
    };
    load();
  }, [router.isReady, router.query.building]);

  return (
    <div>
      <div className="mt-20 flex flex-col items-center justify-center space-y-2">
        <div className="font-monumentExtended mx-2 text-center text-xl">
          {router.query.building}
        </div>
        <div className="flex flex-col items-center p-3 text-center text-xs">
          Note that if a classroom does not appear here, no class is scheduled
          for that room.
        </div>
        <div className="flex w-full max-w-3xl flex-col items-center gap-2 p-2">
          {isLoading ? (
            <BeatLoader />
          ) : Object.keys(allRoomsStatus).length > 0 ? (
            Object.entries(allRoomsStatus).map(([room, status], index) => (
              <Classroom
                room={room}
                status={status[0]}
                endTime={status[1]}
                startTime={status[2]}
                key={index}
              />
            ))
          ) : (
            <div>No data found</div>
          )}
        </div>
      </div>
    </div>
  );
}
