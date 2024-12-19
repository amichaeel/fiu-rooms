import Garage from "@/components/Garage"

const garages = ['PG1', 'PG2', 'PG3', 'PG4', 'PG5', 'PG6'];

export default function Parking() {
  return (
    <div className="flex flex-col items-center justify-center">
      <section id="parking" className="md:mt-20 mt-28 grid w-full max-w-screen-xl grid-cols-1 gap-3 px-2 pt-6 md:grid-cols-2 lg:grid-cols-3">
        {garages.map(garage => (
          <Garage key={garage} garage={garage} />
        ))}
      </section>
    </div>
  )
}