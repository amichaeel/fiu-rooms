import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
  return (
    <footer className="footer bg-[rgb(8,30,63)] text-white/80 items-center flex justify-center p-4 text-neutral-content">
      <div className="flex flex-col max-w-xl w-full items-center">
        <aside className="flex flex-col items-center text-center text-xs">
          <p className="font-semibold">FIU Rooms is not affiliated with Florida International University</p>
          <div className="flex flex-row space-x-1 items-center justify-center">
            <span>Suggestions?</span>
            <Link className="text-[rgb(182,134,44)]" href={"mailto:mail@anthonymham.com"}>Email me</Link>
            <span>or submit an issue on</span>
            <Link className="text-[rgb(182,134,44)]" href={"https://www.github.com/amichaeel/fiu-rooms"}>github</Link>
          </div>
        </aside>
        <nav className="flex text-lg flex-row space-x-3">
          <Link href={"https://www.github.com/amichaeel"}><FontAwesomeIcon icon={faGithub} /></Link>
          <Link href={"https://www.linkedin.com/in/xnthiny"}><FontAwesomeIcon icon={faLinkedin} /></Link>
        </nav>
      </div>
    </footer>
  )
}