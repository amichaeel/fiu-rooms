import React, { useState, useEffect } from 'react';
import Garage from "@/components/Garage";

const garages = ['PG1', 'PG2', 'PG3', 'PG4', 'PG5', 'PG6'];
const REFRESH_INTERVAL = 60000;

export default function Parking() {
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setKey(prevKey => prevKey + 1);
    }, REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center px-2 py-2 justify-center">
      <section
        id="parking"
        className="grid w-full max-w-screen-xl grid-cols-1 md:grid-cols-2 gap-3 pt-6"
      >
        {garages.map(garage => (
          <Garage key={`${garage}-${key}`} garage={garage} />
        ))}
      </section>
    </div>
  );
}