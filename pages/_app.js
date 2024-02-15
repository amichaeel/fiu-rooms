import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Analytics } from "@vercel/analytics/react";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="flex min-h-screen flex-col justify-between">
        <div>
          <Navbar />
          <Component {...pageProps} />
        </div>
        <Analytics />
        <Footer />
      </div>
    </>
  );
}
