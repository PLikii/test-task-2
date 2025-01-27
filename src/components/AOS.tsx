"use client";

import { useEffect } from "react";

export default function AOS() {
  useEffect(() => {
    import("aos").then(AOS => {
      AOS.init({
        once: false,
      });
    });
  }, []);
  return null;
}
