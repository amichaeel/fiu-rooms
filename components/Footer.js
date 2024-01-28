import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
  return (
    <footer className="footer footer-center p-10 bg-[rgb(8,30,63)] mt-10 text-primary-content">
      <aside>
        <p>FIU Rooms is not affiliated with Florida International University</p>
        <div className="flex space-x-1 flex-row items-center justify-center">
          <span>Suggestions?</span>
          <Link className="text-[rgb(182,134,44)]" href={"mailto:mail@anthonymham.com"}>Email me</Link>
          <span>or submit an issue on</span>
          <Link className="text-[rgb(182,134,44)]" href={"https://www.github.com/amichaeel/fiu-rooms"}>github</Link>
        </div>
      </aside>
      <nav>
        <div className="grid grid-flow-col text-2xl gap-4">
          <Link href={"https://www.github.com/amichaeel"}><FontAwesomeIcon icon={faGithub} /></Link>
          <Link href={"https://www.linkedin.com/in/xnthiny"}><FontAwesomeIcon icon={faLinkedin} /></Link>
        </div>
      </nav>
    </footer>
  )
}