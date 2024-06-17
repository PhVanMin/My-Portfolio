"use client";

import { useEffect, useRef, useState } from "react";
import { useStore } from "@/zustand/store";
import { useShallow } from "zustand/react/shallow";
import { Get } from "@/database/database";
import { GetURL } from "@/database/storage";

export function Controls({ width = 100, height = 30, enable = false }) {
  const isPlaying = useStore(useShallow((state) => state.isMusicPlaying));
  const playMusic = useStore((state) => state.playMusic);
  const pauseMusic = useStore((state) => state.pauseMusic);
  const musicURL = useRef(null);
  const audio = useRef(null);
  const [index, setIndex] = useState(-1);

  useEffect(() => {
    const getData = async () => {
      const musicList = await Get("musics");
      if (musicList === null) return;

      const convertedUrls = [];
      for (let i = 1; i < musicList.length; i++) {
        convertedUrls.push(await GetURL(musicList[i]));
      }

      musicURL.current = convertedUrls;
      setIndex(1);
    };

    getData();
  }, []);

  useEffect(() => {
    if (index != -1) {
      audio.current = new Audio(musicURL.current[index]);
      audio.current.load();

      if (isPlaying) {
        audio.current.play();
      }

      const nextSong = () => {
        navigateSong(1);
      };

      audio.current.addEventListener("ended", nextSong);
      return () => {
        audio.current.pause();
        audio.current.removeEventListener("ended", nextSong);
        audio.current = null;
      };
    }
  }, [index]);

  useEffect(() => {
    if (!enable && audio.current) {
      audio.current.pause();
      pauseMusic();
    }
  }, [enable]);

  const getNextIndex = (i) => {
    if (index + i === musicURL.current.length) return 0;
    if (index + i === -1) return musicURL.current.length - 1;
    return index + i;
  };

  const navigateSong = (i) => {
    audio.current.pause();
    setIndex(getNextIndex(i));
  };

  const handlePlayClick = () => {
    if (!audio.current) return;

    if (!isPlaying) {
      playMusic();
      audio.current.play();
    } else {
      pauseMusic();
      audio.current.pause();
    }
  };

  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
      }}
      className="p-2 flex justify-center items-center relative overflow-hidden">
      <div
        className={`left-0 flex justify-center items-center ease-out duration-300 ${
          !enable ? "absolute translate-x-[-100%]" : ""
        }`}>
        <div
          onClick={() => navigateSong(-1)}
          className="cursor-pointer hover:text-blue-400">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path d="M4 5h3v10H4V5zm12 0v10l-9-5 9-5z" />
          </svg>
        </div>
        <div
          className="cursor-pointer hover:text-blue-400"
          onClick={handlePlayClick}>
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            {isPlaying ? (
              <path d="M5 4h3v12H5V4zm7 0h3v12h-3V4z" />
            ) : (
              <path d="M4 3.25v13.5L16.75 10 4 3.25z" />
            )}
          </svg>
        </div>
        <div
          onClick={() => navigateSong(1)}
          className="cursor-pointer hover:text-blue-400">
          <svg
            className="w-8 h-8"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20">
            <path d="M13 5h3v10h-3V5zM4 5l9 5-9 5V5z" />
          </svg>
        </div>
      </div>
      <div
        className={`w-full content-center h-full text-center left-0 ease-out duration-300 ${
          enable ? "absolute translate-x-[100%]" : ""
        }`}>
        Music
      </div>
    </div>
  );
}
