"use client";

import { useEffect } from "react";

// Entrance for the parts of each section. Elements marked data-reveal rise in
// once as they enter the screen. Without script nothing is hidden: the hidden
// state only applies after this sets the class on <html>.
export default function RevealObserver() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.setAttribute("data-in", ""));
      return;
    }
    document.documentElement.classList.add("nt-motion");
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.setAttribute("data-in", "");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.12 },
    );
    els.forEach((el) => io.observe(el));
    return () => {
      io.disconnect();
      document.documentElement.classList.remove("nt-motion");
    };
  }, []);
  return null;
}
