"use client";

import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { Switch } from "@/components/ui/switch";
import { useStore } from "@/zustand/store";
import { Get } from "@/database/database";
import { GetURL } from "@/database/storage";
import Controls from "../ui/header_music_controls";
import { usePathname } from "next/navigation";

const links = [
  { name: "Home", url: "/" },
  { name: "Projects", url: "/projects" },
  { name: "Playground", url: "/playground" },
];

export function Header() {
  const pathName = usePathname();
  const audioRef = useRef(null);
  const musicURL = useRef([]);
  const isPlaying = useStore((state) => state.isMusicPlaying);
  const playMusic = useStore((state) => state.playMusic);
  const pauseMusic = useStore((state) => state.pauseMusic);
  const [enableMusic, setEnableMusic] = useState(false);
  const [source, setSource] = useState(null);
  const [active, setActive] = useState(-1);
  const [hidden, setHidden] = useState(true);

  useEffect(() => {
    const getData = async () => {
      const musicList = await Get("musics");
      if (musicList === null) return;

      musicURL.current = [];
      for (const i of musicList) {
        if (i) {
          const url = await GetURL(i);
          musicURL.current.push(url);
        }
      }

      setSource(musicURL.current[0]);
    };

    getData();
  }, []);

  useEffect(() => {
    if (source) {
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [source]);

  const play = () => {
    audioRef.current?.play();
    playMusic();
  };

  const pause = () => {
    audioRef.current?.pause();
    pauseMusic();
  };

  const handlePlay = () => {
    if (!isPlaying) {
      play();
    } else {
      pause();
    }
  };

  const getSongFromCurrent = (i) => {
    const index = musicURL.current.indexOf(source) + i;
    if (index === musicURL.current.length) return musicURL.current[0];
    if (index === -1) return musicURL.current[musicURL.current.length - 1];
    return musicURL.current[index];
  };

  const navigateSong = (i) => {
    audioRef.current?.pause();
    setSource(getSongFromCurrent(i));
  };

  useEffect(() => {
    const currentPathIndex = links.findIndex((link) => link.url === pathName);
    setActive(currentPathIndex);
  }, [pathName]);

  return (
    <nav className="z-10 fixed w-full top-0 lg:top-4 flex justify-center">
      <div className="lg:py-2 lg:px-4 relative lg:rounded-full lg:border-blue-700 lg:backdrop-blur lg:border-2 lg:bg-black/60 w-full lg:w-[80%] flex max-lg:flex-wrap items-center">
        <div className="max-lg:bg-black/80 p-2 lg:py-0 flex w-full items-center justify-between">
          <div className="text-2xl">Pham Minh</div>
          <button
            onClick={() => setHidden(!hidden)}
            type="button"
            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg lg:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600">
            <span className="sr-only">Menu</span>
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
        <div className="flex items-center gap-2 max-lg:hidden">
          {/* <Controls
            isPlaying={isPlaying}
            pOnclick={() => navigateSong(-1)}
            cOnClick={handlePlay}
            nOnclick={() => navigateSong(1)}
            slide={enableMusic}
          /> */}
          <Switch
            disabled={source === null}
            onClick={() => {
              pause();
              setEnableMusic(!enableMusic);
            }}
            className="data-[state=checked]:bg-emerald-300 z-50"
          />
        </div>
        <div
          className={`flex lg:block max-lg:rounded-2xl max-lg:bg-black/80 max-lg:backdrop-blur max-lg:border-fuchsia-400 max-lg:border-2 max-lg:w-full m-2 lg:absolute lg:top-1/2 lg:left-1/2 lg:-translate-x-1/2 lg:-translate-y-1/2 lg:mt-0`}>
          <ul className="font-medium flex flex-col p-4 lg:p-0 lg:flex-row lg:space-x-8 rtl:space-x-reverse">
            {links.map((link, index) => (
              <li
                key={index}
                onClick={() => setActive(index)}
                className={`flex items-center hover:text-blue-600`}>
                <Link href={link.url}>{link.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <audio
        onEnded={() => navigateSong(1)}
        ref={audioRef}
        src={source}
        type="audio/mpeg"
      />
    </nav>
  );
}
