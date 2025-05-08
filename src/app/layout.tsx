import type { Metadata } from "next";
import "./globals.css";
import "aos/dist/aos.css";
import AOS from "@/components/AOS";

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
      <body className="min-h-screen flex-col antialiased">
        <AOS />
        {children}
      </body>
    </html>
  );
}
