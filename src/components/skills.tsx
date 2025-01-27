import { IoLogoGithub } from "react-icons/io";
import { FaReact } from "react-icons/fa";
import { RiNextjsLine } from "react-icons/ri";
import { RiTailwindCssFill } from "react-icons/ri";
import { DiJsBadge } from "react-icons/di";
import { SiTypescript } from "react-icons/si";
import { FaPython } from "react-icons/fa";
import { FaDocker } from "react-icons/fa";
import { SiMongodb } from "react-icons/si";
import { SiPostgresql } from "react-icons/si";

export default function Skills() {
  const items = (IconComponent, name) => (
    <div className="group relative overflow-visible" data-aos="flip-up">
      <IconComponent className="h-16 w-16 fill-primary duration-700 hover:scale-105" />
      <div className="-translate-x-1/2 pointer-events-none absolute bottom-full left-1/2 mb-2 rounded px-2 py-1 text-sm text-white opacity-0 transition-opacity duration-700 group-hover:opacity-100">
        {name}
      </div>
    </div>
  );

  return (
    <div className=" flex flex-col gap-6 lg:items-center lg:justify-center ">
      <div className=" w-52 rounded-2xl bg-card py-2 text-center font-bold text-lg text-primary">
        🧑‍💻 Навички · Досвід
      </div>

      <div className=" font-extrabold text-2xl text-title sm:text-4xl">
        Технології та навички
      </div>

      <div className=" my-2 sm:text-lg">
        Технології, якими я користуюся щодня
      </div>

      <div
        className=" flex space-x-4 overflow-y-hidden overflow-x-scroll sm:space-x-8 lg:overflow-visible "
        data-aos="flip-up"
      >
        {items(FaReact, "React")}
        {items(DiJsBadge, "JavaScript")}
        {items(RiNextjsLine, "Next.js")}
        {items(SiTypescript, "Typescrip")}
        {items(RiTailwindCssFill, "TailwindCss")}
        {items(IoLogoGithub, "GitHub")}
      </div>

      <div className=" my-2 sm:text-lg">Інші техніки, з якими я працював</div>

      <div className=" flex space-x-4 sm:space-x-8 ">
        {items(FaPython, "Python ")}
        {items(FaDocker, "Docker")}
        {items(SiMongodb, "Mongodb ")}
        {items(SiPostgresql, "PostgreSQL ")}
      </div>
    </div>
  );
}
