"use client";

import { useState, useEffect } from "react";
import { defaultTabs } from "@/lib/Tab";
import { map } from "lodash";
import { TiThMenu } from "react-icons/ti";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const renderNavbarItems = () =>
    map(defaultTabs, ({ id, href, label }) => (
      <a
        key={id}
        href={href}
        className="duration-200 hover:scale-105 hover:text-primary"
      >
        {label}
      </a>
    ));

  return (
    <div className="relative">
      <button type="button" onClick={toggleMenu}>
        <TiThMenu className="h-14 w-14 fill-secondary duration-300 hover:scale-105 hover:fill-primary" />
      </button>
      {isOpen && (
        <div>
          <button
            className=" fixed inset-0 bg-gray-900/80"
            onClick={toggleMenu}
            type="button"
          >
            {" "}
          </button>
          <div className="fixed inset-y-0 left-0 z-50 flex h-full flex-col gap-10 bg-background p-10">
            <div className="flex flex-col items-center gap-10">
              {renderNavbarItems()}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
