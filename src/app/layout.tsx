import type { Metadata } from "next";
import "./globals.css";
import "aos/dist/aos.css";
import AOS from "@/components/AOS";

export const metadata: Metadata = {
  title: "Максим Гнатишин | Front-end Developer",
  description:
    "Мене звати Максим Гнатишин, я Front-end розробник з досвідом роботи з JavaScript, React, Next.js та TypeScript. Випускник Західноукраїнського національного університету, спеціальність Інженерія програмного забезпечення.",
  keywords: [
    "Front-end Developer",
    "React",
    "Next.js",
    "JavaScript",
    "TypeScript",
    "Web Development",
    "Software Engineering",
  ],
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
        {children}
      </body>
    </html>
  );
}
