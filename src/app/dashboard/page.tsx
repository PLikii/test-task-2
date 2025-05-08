import { LuRabbit } from "react-icons/lu";

export default function Dashboard() {
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
          Select a to-do list or create a new one
        </div>
      </div>
    </div>
  );
}
