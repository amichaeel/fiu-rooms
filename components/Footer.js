import Link from "next/link"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGithub, faLinkedin } from "@fortawesome/free-brands-svg-icons"

export default function Footer() {
  return (
    <footer className="footer items-center p-2 bg-neutral mt-10 text-neutral-content dark:bg-[#353941]">
      <aside className="flex flex-col items-center w-full justify-center text-xs dark:font-[#353941] p-2">
        <p>FIU Rooms is not affiliated with Florida International University</p>
        </aside>
    </footer>
  )
}