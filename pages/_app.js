import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function MyApp({ Component, pageProps }) {
  return (
      <div>
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
  )
}