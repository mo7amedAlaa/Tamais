import type { Metadata } from "next";
import { Cairo } from "next/font/google";
import Navbar from "@/app/_components/pages/home/layout/navbar/Navbar";
import Footer from "@/app/_components/pages/home/layout/footer/Footer";
import Header from "@/app/_components/ui/Header";
const cairo = Cairo({ weight: "400", subsets: ["arabic"] });
export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div
      className={`${cairo.className} bg-[#F9F9F9] overflow-hidden text-black`}
    >
      <Header />
      {children}
    </div>
  );
}
