import { RiTelegram2Line } from "react-icons/ri";

export default function Footer() {
  return (
    <footer className="grid grid-cols-1 bg-card px-10 py-6 lg:grid-cols-2 lg:px-24">
      <div className="flex place-content-center items-center lg:place-content-start">
        Copyright © PLikii · 2024
      </div>
      <div className="order-first mb-4 flex place-content-center items-center lg:order-last lg:mb-0 lg:place-content-start">
        <a href="https://t.me/PLikii" target="_blank" rel="noreferrer">
          <RiTelegram2Line className="size-8 duration-300 hover:scale-110 hover:fill-secondary" />
        </a>
      </div>
    </footer>
  );
}
