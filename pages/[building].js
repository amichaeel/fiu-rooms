import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import { isRoomInUse, transformClassesToSchedule } from "@/utils/scheduleUtils";
import Classroom from "@/components/Classroom";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";

export default function Page() {
  const [allRoomsStatus, setAllRoomsStatus] = useState({});
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const load = async () => {
      try {
        if (!router.query.building) {
          return;
        }
        const building = router.query.building
        const uri = `/api/building?building=${building}`;
        const response = await fetch(uri);
        const data = await response.json();

        const transformSchedule = transformClassesToSchedule(data)

        const newAllRoomsStatus = Object.entries(transformSchedule).reduce((acc, [room, schedule]) => {
          acc[room] = isRoomInUse(schedule, new Date());
          return acc;
        }, {});

        setAllRoomsStatus(newAllRoomsStatus);
        console.log(allRoomsStatus)

      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false)
      }
    }
    load()
  }, [router.isReady, router.query.building])

  return (
    <>
      <div className="flex flex-col items-center justify-center space-y-2 my-20">
        <div className="text-center text-xl font-monumentExtended">
          {router.query.building}
        </div>
        <div className="flex flex-col text-center items-center text-xs">
          Note that if a classroom does not appear here, no class is scheduled for that room.
        </div>
        <div className="flex flex-col space-y-2 max-w-lg" >
          {isLoading ? (
            <BeatLoader />
          ) : (
            Object.keys(allRoomsStatus).length > 0 ? (
              Object.entries(allRoomsStatus).map(([room, status], index) => (
                <Classroom room={room} status={status} key={index} />
              ))
            ) : (
              <div>No data found</div>
            )
          )}
        </div>
      </div>
    </>
  );
}