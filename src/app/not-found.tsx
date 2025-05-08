import Link from "next/link";
import { LuRabbit } from "react-icons/lu";

export default function NotFound() {
  return (
    <div className=" grid min-h-screen w-full place-items-center ">
      <div className=" grid place-items-center ">
        <LuRabbit
          className="size-40 animate-bounce text-primary"
          data-aos="zoom-out"
        />
        <div
          className="mb-10 text-center font-bold text-3xl text-primary xl:text-5xl"
          data-aos="flip-up"
        >
          Схоже сторінку не знайдено
        </div>
        <Link
          href="/"
          data-aos="flip-up"
          className="group relative me-2 mb-2 inline-flex items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-purple-600 to-blue-500 p-0.5 font-medium text-gray-900 text-sm hover:text-white focus:outline-none focus:ring-4 focus:ring-blue-300 group-hover:from-purple-600 group-hover:to-blue-500 dark:text-white dark:focus:ring-blue-800"
        >
          <span className="relative rounded-md bg-white px-5 py-2.5 text-xl transition-all duration-75 ease-in group-hover:bg-opacity-0 dark:bg-gray-900">
            Повернутися на головну
          </span>
        </Link>
      </div>
    </div>
  );
}
