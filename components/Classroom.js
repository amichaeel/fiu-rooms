import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleDot,
} from "@fortawesome/free-solid-svg-icons";
import { Transition } from "@headlessui/react";
import { Inter } from "next/font/google";
import EventIcon from "@mui/icons-material/Event";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export default function Classroom({
  room,
  status,
  endTime,
  startTime,
  nextStart,
}) {
  const [moreInfoActive, setMoreInfoActive] = useState(false);
  const isClosingSoon = (nextStart) => {
    const parsedDate = new Date(nextStart)
    const currentTime = new Date();
    const differenceInMs = Math.abs(currentTime - parsedDate);
    const differenceInMinutes = differenceInMs / (1000 * 60);
    return differenceInMinutes < 30;
  }
  const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(
    room
  )}`;
  return (
    <div className="w-full rounded-md bg-neutral-200/60 text-black dark:bg-[#353941] dark:text-slate-200">
      <div className="flex flex-row items-center justify-between p-2">
        <div className="rounded-xl p-2 transition ">
          <div className="flex items-center font-semibold">
            {room}
          </div>
        </div>
        <div className="flex flex-row items-center justify-center text-xs bg-base-100/30 p-3 rounded-xl">
          <div className="font-semibold">
            {status ? " In Use" : isClosingSoon(nextStart) ? (
              "Closing Soon"
            ) : (
              "Open"
            )}
          </div>
          <div>
            <FontAwesomeIcon
              className={`pl-2 text-xs ${status ? "text-red-600" : isClosingSoon(nextStart) ? "text-yellow-600" : "text-green-600"}`}
              icon={faCircleDot}
            />
          </div>
          {/* <div
            onClick={() => setMoreInfoActive(!moreInfoActive)}
            className="btn btn-sm btn-circle btn-outline ml-2 w-fit cursor-pointer p-2 transition"
          >
            <FontAwesomeIcon
              icon={faChevronDown}
              className={`transition ` + (moreInfoActive ? "rotate-180" : "")}
            />
          </div> */}
        </div>
      </div>
      {
        status ? (
          <div
            className={`flex flex-col items-center justify-center py-4 text-xs font-semibold ${inter.className}`}
          >
            {(() => {
              const currentTime = new Date().getTime();
              const startTimeMillis = startTime.getTime();
              const endTimeMillis = endTime.getTime();
              const totalDurationMillis = endTimeMillis - startTimeMillis;
              const elapsedMillis = currentTime - startTimeMillis;

              const diffMillis = endTimeMillis - currentTime;
              if (diffMillis < 0) {
                return "Class has ended. Please refresh";
              }

              const diffMinutes = Math.ceil(diffMillis / 1000 / 60);
              const hours = Math.floor(diffMinutes / 60);
              const minutes = diffMinutes % 60;

              if (hours > 0) {
                return (
                  <div className="flex flex-col items-center justify-center">
                    <div className="flex w-full flex-row justify-between text-[10px] opacity-85">
                      <span>
                        {startTime
                          .toLocaleString()
                          .split(", ")[1]
                          .replace(":00", "")}
                      </span>
                      <span>
                        {endTime
                          .toLocaleString()
                          .split(", ")[1]
                          .replace(":00", "")}
                      </span>
                    </div>
                    <progress
                      className="progress mb-4 w-56"
                      value={elapsedMillis}
                      max={totalDurationMillis}
                    ></progress>
                    <span>
                      Ends in {hours} hours and {minutes} minutes
                    </span>
                  </div>
                );
              }
              return (
                <div className="flex flex-col items-center justify-center">
                  <div className="flex w-full flex-row justify-between text-[10px] opacity-85">
                    <span>
                      {startTime
                        .toLocaleString()
                        .split(", ")[1]
                        .replace(":00", "")}
                    </span>
                    <span>
                      {endTime.toLocaleString().split(", ")[1].replace(":00", "")}
                    </span>
                  </div>
                  <progress
                    className="progress mb-4 w-56"
                    value={elapsedMillis}
                    max={totalDurationMillis}
                  ></progress>
                  <span className="">Ends in {minutes} minutes</span>
                </div>
              );
            })()}
          </div>
        ) : (
          <div className="flex flex-col items-center p-4">
            <span className="flex text-[10px] uppercase opacity-50">
              Next class starts on:
            </span>
            <span className="flex flex-row items-center justify-center space-x-2 text-sm opacity-70">
              <EventIcon fontSize="small" />
              <div>
                {nextStart.toLocaleString("en-US", {
                  dateStyle: "full",
                  timeStyle: "short",
                })}
              </div>
            </span>
          </div>
        )
      }
      {/* <div className="flex cursor-pointer flex-col gap-2 text-xs transition">
        <Transition
          show={moreInfoActive}
          enter="transition ease-out duration-300"
          enterFrom="transform opacity-0 scale-95"
          enterTo=" transform opacity-100 scale-100"
          leave="transition ease-in duration-300"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <div className="m-3 flex flex-col items-center justify-center text-center">
            <span className="font-semibold">
              More information about this classroom be available here soon!
            </span>
            <span>
              Ex: Fixed Seating, Podium PC, Tables and Chairs, Tiered Seating,
              Video Conferencing
            </span>
            <span>Max Copacity: 34</span>
          </div>
        </Transition>
      </div> */}
    </div >
  );
}
