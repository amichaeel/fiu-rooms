import Link from "next/link"

export default function Footer() {
  return (
    <footer className="flex flex-col text-xs font-light text-gray/40 text-center py-4">
      <span className="font-bold">Not affiliated with FIU.</span>
      <span>Created by Anthony Ham</span>
      <div className="flex flex-row space-x-1 items-center justify-center">
        <span>Suggestions?</span>
        <Link className="text-[rgb(182,134,44)]" href={"mailto:mail@anthonymham.com"}>Email me</Link>
        <span>or submit an issue on</span>
        <Link className="text-[rgb(182,134,44)]" href={"https://www.github.com/amichaeel/fiu-rooms"}>github.</Link>
      </div>
    </footer>
  )
}