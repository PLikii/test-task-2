import type { Metadata } from "next";
import "./globals.css";
import "aos/dist/aos.css";
import AOS from "@/components/AOS";
import Tabs from "@/components/tabs";

export const metadata: Metadata = {
  title: "test task",
  description: "test task.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        <AOS />
        <Tabs />
        {children}
      </body>
    </html>
  );
}
