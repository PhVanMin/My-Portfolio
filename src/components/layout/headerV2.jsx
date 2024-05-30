"use client";
import Link from "next/link";
import { memo, useCallback, useState, useRef } from "react";
import { Switch } from "@/components/ui/switch";
import { Controls } from "@/components/ui/header_music_controls";

const navLinks = [
  {
    title: "About",
    path: "/",
  },
  {
    title: "Projects",
    path: "/projects",
  },
  {
    title: "Playground",
    path: "/playground",
  },
];

const MusicControl = memo(({ className }) => {
  console.log("music control");

  const [enabled, setEnabled] = useState(false);
  const handleSwitch = useCallback(() => setEnabled((state) => !state), []);
  return (
    <div className={className}>
      <Controls enable={enabled} />
      <Switch
        onClick={handleSwitch}
        className="data-[state=checked]:bg-emerald-300"
      />
    </div>
  );
});

export const Header = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const handleOpen = useCallback(() => setNavbarOpen((state) => !state));

  return (
    <nav className="fixed flex justify-center mx-auto top-0 left-0 right-0 z-10">
      <div className="relative md:border-2 bg-black md:bg-black/40 md:backdrop-blur md:border-blue-600 md:rounded-full flex container md:m-2 flex-wrap items-center justify-between mx-auto px-4 py-2">
        <p className="text-2xl text-white font-semibold">PhVanMinh</p>
        <MusicControl className="flex items-center max-md:hidden" />
        <div className="block md:hidden">
          <button
            onClick={handleOpen}
            className="flex items-center px-3 py-2 border rounded border-slate-200 text-slate-200 hover:text-white hover:border-white">
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14">
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
          </button>
        </div>
        <div
          className={`md:absolute md:top-1/2 md:left-1/2 md:-translate-x-1/2 md:-translate-y-1/2 w-full py-1 md:w-auto md:block ${
            navbarOpen ? "" : "hidden"
          }`}
          id="navbar">
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <li key={index}>
                <Link
                  href={link.path}
                  className="block py-1 text-white sm:text-xl rounded md:p-0 hover:text-blue-500">
                  {link.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};
