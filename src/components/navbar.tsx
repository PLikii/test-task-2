import { IoLogoGithub } from "react-icons/io";
import { FaTelegram } from "react-icons/fa";
import { navbar } from "@/lib/navbar";
import { map } from "lodash";

export default function Navbar() {
  const renderNavbarItems = () =>
    map(navbar, ({ id, href, title }) => (
      <a
        key={id}
        href={href}
        className="duration-200 hover:scale-105 hover:text-primary "
      >
        {title}
      </a>
    ));

  return (
    <nav className="top-0 z-50 lg:sticky" data-aos="fade-right">
      <div className="flex justify-center gap-6 pt-8 lg:hidden">
        <a href="https://github.com/PLikii">
          <IoLogoGithub className="h-14 w-14 fill-description" />
        </a>
        <a href="https://t.me/PLikii">
          <FaTelegram className="h-14 w-14 fill-description" />
        </a>
      </div>

      <div className="hidden bg-background pt-8 lg:block">
        <div className="mx-56 flex items-center justify-between gap-6 rounded-2xl bg-card px-10">
          <img
            src="/penguin.svg"
            alt="logo"
            className="pointer-events-none h-20 w-20"
          />
          <div className="flex items-center gap-10">{renderNavbarItems()}</div>
        </div>
      </div>
    </nav>
  );
}
