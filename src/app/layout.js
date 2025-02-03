

import { Roboto } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";
import Script from 'next/script';


import AdSense from "./components/AdSense";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Daily Operation - The Lo-Fi, Boom Bap & chilled beats music platform",
  description: "Explore top-quality Lo-Fi, Boom Bap & chilled beats on our platform. Perfect for studying, relaxing, and creative projects.",
  keywords: [
    "Lo-fi hip hop beats",
    "Boom bap beats",
    "Relaxing music",
    "Chill beats",
    "machine learning",
    "Background music"
  ],
  openGraph: {
    url: "https://dailyoperation.uk",
    type: "website",
    title: "Daily Operation - Lo-Fi Boom Bap Hip Hop beats music platform",
    description:
      "Explore top-quality Lo-Fi Boom Bap Hip Hop beats on our platform. Perfect for studying, relaxing, and creative projects.",
    images: [
      {
        url: "https://dailyoperation.uk/screenshot_dailyoperation.png",
        width: 1200,
        height: 630,
        alt: "dailyoperation",
      }
    ],
    twitter: {
    card: "summary_large_image",
    title: "Daily Operation - The Lo-fi Boom Bap Beats Music Platform",
    description:
      "Explore top-quality Lo-Fi Boom Bap Hip Hop beats on our platform. Perfect for studying, relaxing, and creative projects.",
    creator: "@dailyoperationuk",
    site: "@dailyoperationuk",
    images: [
      {
        url: "https://dailyoperation.uk/screenshot_dailyoperation.png",
        width: 1200,
        height: 630,
        alt: "dailyoperationuk"
      }
    ]
  },
  alternates: {
    canonical: "https://dailyoperation.uk",
  }
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
    <head>
    <Script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-5775457776021614"
     crossorigin="anonymous"></Script>
    {/* <AdSense pId={"pub-5775457776021614"} /> */} 
    </head>
    
      <body className={roboto.className}>{children}</body>
      <GoogleAnalytics gaId="G-T3B34PZSBB" />
    </html>
  );
}

