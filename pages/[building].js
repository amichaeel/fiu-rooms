import React, { useState, useEffect } from "react";
import Classroom from "@/components/Classroom";
import { isRoomInUse, transformClassesToSchedule } from "@/utils/scheduleUtils";
import { useRouter } from "next/router";
import { BeatLoader } from "react-spinners";
import { buildings } from "@/utils/buildings";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt } from "@fortawesome/free-solid-svg-icons";


export default function Page() {
  const [allRoomsStatus, setAllRoomsStatus] = useState({});
  const [notFound, setNotFound] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(
    router.query.building
  )}`;

  useEffect(() => {
    const load = async () => {
      try {
        if (!router.query.building) {
          return;
        }
        const building = router.query.building;
        if (!buildings.includes(building)) {
          setNotFound(true);
          return;
        }
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
    <div className="">
      <div className="mt-20 w=full flex flex-col items-center justify-center space-y-2">
        {notFound ? (
          <div>Building not found.</div>
        ) : (
          <div className="w-full max-w-3xl">
            <div className="font-monumentExtended mx-2 text-center text-xl">
              {router.query.building}
              <a
                href={googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline ml-2 bg-base-100 hover:bg-base-300 transition-all px-3 py-1 rounded-xl"
              >
                <FontAwesomeIcon className="" icon={faMapMarkerAlt} />
              </a>
            </div>
            <div className="flex flex-col items-center p-3 text-center text-xs">
              Note that if a classroom does not appear here, no class is scheduled
              for that room.
            </div>
            <div className="flex w-full max-w-6xl flex-col items-center gap-2 p-2">
              {isLoading ? (
                <BeatLoader className="dark:invert" />
              ) : Object.keys(allRoomsStatus).length > 0 ? (
                Object.entries(allRoomsStatus)
                  .sort(([roomA], [roomB]) => roomA.localeCompare(roomB))
                  .map(([room, status], index) => (
                    <Classroom
                      room={room}
                      status={status[0]}
                      endTime={status[1]}
                      startTime={status[2]}
                      nextStart={status[3]}
                      key={index}
                    />
                  ))
              ) : (
                <div>No data found</div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
