import "./globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="flex flex-col h-screen justify-between">
      <div>
        <Navbar />
        <Component {...pageProps} />
      </div>
      <Footer />
    </div>
  )
}