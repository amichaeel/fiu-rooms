import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { Car } from "lucide-react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

export default function Garage({ garage }) {
  const [isLoading, setIsLoading] = useState(true);
  const [parkingData, setParkingData] = useState(null);

  useEffect(() => {
    const loadParkingData = async () => {
      try {
        const response = await fetch('/api/parking');
        const garages = await response.json();

        const foundGarage = garages.find(g => g.garageName === garage);
        if (foundGarage) {
          setParkingData(foundGarage);
        }
      } catch (error) {
        console.error("Error fetching parking data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadParkingData();
  }, [garage]);

  const calculateAvailability = () => {
    if (!parkingData) return { total: 0, available: 0, percentage: 0 };

    const totalSpaces = parkingData.studentMax;
    const availableSpaces = parkingData.studentMax - parkingData.studentSpaces
    const spacesTaken = parkingData.studentSpaces
    const percentage = Math.round((spacesTaken / totalSpaces) * 100);

    return { total: totalSpaces, available: availableSpaces, percentage };
  };

  const availability = calculateAvailability();

  return (
    <div className="group/building flex h-[100px] cursor-pointer flex-row items-center justify-between space-x-6 rounded-md bg-base-content/5 border border-base-content/10 p-4 transition hover:bg-white/10">
      <div className="text-md flex flex-col h-full justify-between text-base-content">
        <span>{garage}</span>
        <span className="text-xs flex items-center gap-2">
          <Car size={20} />
          {!isLoading && `${availability.available} spaces available`}
        </span>
      </div>

      {isLoading ? (
        <div className="justify-self-end text-xs">
          <MoonLoader
            className="mr-10"
            speedMultiplier={0.7}
            color="currentColor"
            size={45}
          />
        </div>
      ) : (
        <div className="flex items-center justify-center text-xs font-semibold text-base-content">
          <div
            className="radial-progress"
            style={{
              "--value": availability.percentage,
              "--size": "4rem",
            }}
            role="progressbar"
          >
            {availability.percentage}%
          </div>
          <ChevronRightIcon className="ml-3" />
        </div>
      )}
    </div>
  );
}