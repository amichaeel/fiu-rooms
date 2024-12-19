import React, { useState } from "react";
import { Inter } from "next/font/google";

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
  const isClosingSoon = (nextStart) => {
    const parsedDate = new Date(nextStart)
    const currentTime = new Date();
    const differenceInMs = Math.abs(currentTime - parsedDate);
    const differenceInMinutes = differenceInMs / (1000 * 60);
    return differenceInMinutes < 30;
  }

  const getStatusColor = () => {
    if (status) return "bg-red-900";
    if (isClosingSoon(nextStart)) return "bg-warning";
    return "bg-green-900/50";
  };

  const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(
    room
  )}`;

  return (
    <div className="collapse hover:bg-base-content/5 rounded-none collapse-arrow text-base-content">
      <input type="checkbox" className="peer" />
      <div className="collapse-title h-14">
        <div className="flex h-full justify-between">
          <div className="flex h-full items-center">
            {room}
          </div>
          <div className="flex h-full items-center">
            <div className={`flex  items-center gap-2 rounded-md bg-base-100/30 px-2 py-1 text-xs ${getStatusColor()}`}>
              <span className="text-white/70 whitespace-nowrap">
                {status ? "in use" : isClosingSoon(nextStart) ? "closing soon" : "available"}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="collapse-content no-animation">
        <div className="pt-4 px-2">
          {status ? (
            <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${inter.className}`}>
              {/* Time Display Section */}
              <div className="flex flex-col space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <span className="text-xs text-base-content/50 uppercase">Start</span>
                    <span className="text-lg">
                      {startTime.toLocaleString().split(", ")[1].replace(":00", "")}
                    </span>
                  </div>
                  <div className="h-8 w-[1px] bg-base-content/10"></div>
                  <div className="flex flex-col items-end">
                    <span className="text-xs text-base-content/50 uppercase">End</span>
                    <span className="text-lg">
                      {endTime.toLocaleString().split(", ")[1].replace(":00", "")}
                    </span>
                  </div>
                </div>

                <div className="flex flex-col space-y-2">
                  {(() => {
                    const currentTime = new Date().getTime();
                    const startTimeMillis = startTime.getTime();
                    const endTimeMillis = endTime.getTime();
                    const totalDurationMillis = endTimeMillis - startTimeMillis;
                    const elapsedMillis = currentTime - startTimeMillis;
                    const diffMillis = endTimeMillis - currentTime;

                    if (diffMillis < 0) {
                      return (
                        <div className="text-error text-center font-medium">
                          Class has ended. Please refresh
                        </div>
                      );
                    }

                    const diffMinutes = Math.ceil(diffMillis / 1000 / 60);
                    const hours = Math.floor(diffMinutes / 60);
                    const minutes = diffMinutes % 60;

                    return (
                      <>
                        <div className="w-full bg-base-200 rounded-full h-3">
                          <div
                            className="bg-base-content h-3 rounded-full transition-all duration-1000"
                            style={{ width: `${(elapsedMillis / totalDurationMillis) * 100}%` }}
                          ></div>
                        </div>
                        <div className="text-center">
                          {hours > 0 ? (
                            <span>Ends in {hours}h {minutes}m</span>
                          ) : (
                            <span>Ends in {minutes}m</span>
                          )}
                        </div>
                      </>
                    );
                  })()}
                </div>
              </div>

              {/* Additional Info Section */}
              <div className="hidden md:flex items-center justify-center border-l border-base-content/10">
                <div className="flex flex-col items-center space-y-2 text-base-content/70">
                  <div className="text-3xl">📍</div>
                  <div className="text-sm text-center">Class is currently in session</div>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center space-y-4 py-4">
              <div className="flex flex-col items-center space-y-2 text-center">
                <span className="text-xs uppercase text-base-content/50">
                  Next class starts on
                </span>
                <span className="text-lg">
                  {nextStart.toLocaleString("en-US", {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}