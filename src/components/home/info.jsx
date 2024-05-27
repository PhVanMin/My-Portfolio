"use client";

import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import avatar from "../../../public/amongus.png";
import avatarDancing from "../../../public/dancing.gif";
import { useStore } from "@/zustand/store";
import { useInView } from "@/utils/useInView";

export default function Info() {
  const isPlaying = useStore((state) => state.isMusicPlaying);
  const { ref, isInView } = useInView({ triggerOnce: true });
  return (
    <section
      ref={ref}
      className={`${
        isInView ? "opacity-100" : "opacity-0"
      } transition-opacity duration-1000 grid grid-cols-1 sm:grid-cols-12 py-5`}>
      <div className="col-span-8">
        <h1 className="text-white mb-4 text-5xl lg:leading-normal font-extrabold">
          <span className="bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400 text-transparent bg-clip-text">
            Hello, I'm
          </span>
          <br></br>
          <TypeAnimation
            sequence={[
              "Minh",
              5000,
              "A College Student",
              5000,
              "A Web Developer",
              5000,
              "An App Developer",
              5000,
            ]}
            wrapper="span"
            speed={50}
            repeat={Infinity}
          />
        </h1>
        <p className="w-3/4 min-[300px]:max-md:w-full text-wrap">
          Welcome to my corner of the digital universe!
          <br />
          <br />
          I'm passionate about programming, a realm where creativity merges
          seamlessly with logic. With a background rooted in code, I traverse
          the landscapes of software development with zeal and curiosity. From
          crafting elegant algorithms to architecting robust systems, I find joy
          in the art of problem-solving and the satisfaction of turning ideas
          into reality through lines of code.
          <br />
          <br />
          Join me as we navigate the ever-evolving world of technology, one byte
          at a time.
        </p>
      </div>
      <div className="col-span-4 place-self-center py-5">
        <div className="relative">
          <div className="-z-10 blur-[150px] absolute rounded-full h-[200px] w-[200px] bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400" />
          <div
            style={{ position: "relative", width: "200px", height: "250px" }}>
            <Image
              alt="avatar"
              src={isPlaying ? avatarDancing : avatar}
              fill={true}
              sizes="200px"
              loading="lazy"
              unoptimized={isPlaying}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
