import { Roboto } from "next/font/google";
import { GoogleAnalytics } from '@next/third-parties/google'
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
});

export const metadata = {
  title: "Daily Operation - Lo-Fi Boom Bap Hip Hop beats music platform",
  description: "Explore top-quality Lo-Fi Boom Bap Hip Hop beats on our platform. Perfect for studying, relaxing, and creative projects.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
      {/* <GoogleAnalytics gaId="G-K7SSN3HFSE" /> */}
    </html>
  );
}

