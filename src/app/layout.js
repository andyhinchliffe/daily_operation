import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ['400'],
  style: ['normal'],
  subsets: ['latin'],
  display: 'swap',
})

export const metadata = {
  title: "Daily Operation",
  description: "Dynamic Sites, WebApps and Coding",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
