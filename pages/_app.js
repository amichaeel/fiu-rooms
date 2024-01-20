import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function MyApp({ Component, pageProps }) {
  return (
      <div className="bg-gray-100">
        <Navbar />
        <Component {...pageProps} />
        <Footer />
      </div>
  )
}