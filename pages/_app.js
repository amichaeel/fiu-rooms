import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Head from "next/head";
import { Analytics } from "@vercel/analytics/react";

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <div className="flex min-h-screen flex-col justify-between">
        <Head>
          <title>FIU Rooms</title>
        </Head>
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
