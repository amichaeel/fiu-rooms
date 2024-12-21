import React, { useEffect, useState } from "react";
import { MoonLoader } from "react-spinners";
import { Car, LocateIcon, MapPin } from "lucide-react";
import Link from "next/link";

export default function Garage({ garage }) {
  const [isLoading, setIsLoading] = useState(true);
  const [parkingData, setParkingData] = useState(null);

  const names = {
    "PG1": "PG1: Gold Parking Garage",
    "PG2": "PG2: Blue Parking Garage",
    "PG3": "PG3: Panther Parking Garage",
    "PG4": "PG4: Red Parking Garage",
    "PG5": "PG5: Market Station",
    "PG6": "PG6: Tech Station"
  }

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

  const handleGarageSearch = (garage) => {
    const googleMapsUrl = `https://www.google.com/maps/search/${encodeURIComponent(garage)}`;
    return googleMapsUrl
  }

  const calculateAvailability = () => {
    if (!parkingData) return {
      student: { total: 0, available: 0, percentage: 0 },
      other: { total: 0, available: 0, percentage: 0 }
    };

    const studentTotal = parkingData.studentMax;
    const studentTaken = parkingData.studentSpaces;
    const studentAvailable = studentTotal - studentTaken;

    const otherTotal = parkingData.otherSpaces < 0 ? parkingData.otherMax + Math.abs(parkingData.otherSpaces) : parkingData.otherMax;
    const otherTaken = Math.max(0, parkingData.otherSpaces);
    const otherAvailable = otherTotal - otherTaken;

    const studentPercentage = Math.round((studentTaken / studentTotal) * 100);
    const otherPercentage = Math.round((otherTaken / otherTotal) * 100);

    return {
      student: { total: studentTotal, available: studentAvailable, percentage: studentPercentage },
      other: { total: otherTotal, available: otherAvailable, percentage: otherPercentage }
    };
  };

  const getStatusColor = (percentage) => {
    if (percentage >= 90) return "text-error";
    if (percentage >= 75) return "text-warning";
    return "text-success";
  };

  const availability = calculateAvailability();

  return (
    <div className="card bg-base-content/5 border border-base-content/10 transition-all">
      <div className="card-body p-4">
        {isLoading ? (
          <div className="skeleton h-32 w-full"></div>
        ) : (
          <>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <h2 className="card-title text-base mr-2">{names[garage]}</h2>
                <Link
                  href={handleGarageSearch(names[garage])}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-sm btn-circle btn-ghost"
                >
                  <MapPin size={20} />
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {/* Student Spaces */}
              <div className="rounded-md p-3">
                <div className="text-xs uppercase text-base-content/70 mb-2">Student</div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className={`flex items-baseline ${getStatusColor(availability.student.percentage)}`}>
                      <span className="text-2xl font-bold">{availability.student.available}</span>
                      <p className="text-base-content/70 text-xs">/{availability.student.total}</p>
                    </div>
                    <span className="text-xs text-base-content/70">spaces left</span>
                  </div>
                  <div
                    className="radial-progress"
                    style={{
                      "--value": availability.student.percentage,
                      "--size": "3rem",
                      "--thickness": "4px",
                    }}
                    role="progressbar"
                  >
                    <span className="text-xs">{availability.student.percentage}%</span>
                  </div>
                </div>
              </div>

              {/* Other Spaces */}
              <div className=" rounded-lg p-3">
                <div className="text-xs uppercase text-base-content/70 mb-2">Other</div>
                <div className="flex items-center justify-between">
                  <div className="flex flex-col">
                    <div className={`flex items-baseline ${getStatusColor(availability.other.percentage)}`}>
                      <span className="text-2xl font-bold">{availability.other.available}</span>
                      <p className="text-base-content/70 text-xs">/{availability.other.total}</p>
                    </div>
                    <span className="text-xs text-base-content/70">spaces left</span>
                  </div>
                  <div
                    className="radial-progress"
                    style={{
                      "--value": availability.other.percentage,
                      "--size": "3rem",
                      "--thickness": "4px",
                    }}
                    role="progressbar"
                  >
                    <span className="text-xs">{availability.other.percentage}%</span>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}