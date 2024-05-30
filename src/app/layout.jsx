import { Inter } from "next/font/google";
import { Header } from "@/components/layout/headerV2";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });
export const metadata = {
  title: "Portfolio",
  description: "Created by PhVanMinh",
};

export default function RootLayout({ children }) {
  return (
    <html className="scroll-smooth" lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        <Header />
        <main className="py-[15%] md:py-[5%]">{children}</main>
      </body>
    </html>
  );
}
