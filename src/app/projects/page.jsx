import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { cn } from "@/lib/utils";

const ProjectItem = ({
  img = "/amongus.png",
  name = "Project name",
  des = "",
  languages,
  link,
  className,
}) => {
  return (
    <div
      className={cn(
        "cursor-pointer group transition-all duration-300 ease-out flex gap-3 p-4 border-2 hover:bg-blue-600/30 bg-blue-600/15 border-blue-700",
        className
      )}>
      <div className="transition-all duration-300 ease-out relative w-0 group-hover:w-32 flex-shrink-0">
        <Image
          className="object-contain"
          alt="avatar"
          fill
          sizes="128px"
          src={img}
          priority
        />
      </div>
      <div className="flex flex-col gap-y-1">
        <h1 className="font-bold text-2xl">{name}</h1>
        <p>{des}</p>
        <ul>
          {languages.map((lang, index) => (
            <li
              key={index}
              className="border-2 inline-flex border-cyan-400 mb-1 me-1 bg-cyan-200/10 px-2">
              {lang}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

const SelectFilter = ({ placeholder, items = [], className }) => {
  return (
    <Select>
      <SelectTrigger className={className}>
        <SelectValue placeholder={placeholder} />
      </SelectTrigger>
      <SelectContent className="bg-black text-white border-blue-700">
        <SelectGroup>
          {items.map((item, index) => (
            <SelectItem key={index} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

const projects = [
  {
    name: "Online Clothing Shop",
    skill: ["ExpressJS", "Bootstrap"],
    des: "A website for buying clothes online",
  },
  {
    name: "Shop Management",
    skill: ["C#"],
    des: "A Windows app that allows users to view and manage shop's information",
  },
  {
    name: "Paint Clone",
    skill: ["C#"],
    des: "A clone of MS Paint app. Built using OOP and design patterns",
    img: "/hobbies/coding.png",
  },
  {
    name: "Real-time Chat App",
    skill: ["Java", "Spring Boot"],
    des: "A Java chat app that allows users to chat with friends in real-time. Also, if the user who logged in as admin can manage the app",
  },
  {
    name: "Music Streaming Platform",
    skill: ["ReactJS", "TailwindCSS", "Django"],
    des: "A music platform that allow users to listen, download and share music for free",
  },
];

export default function Projects() {
  return (
    <section className="w-full p-4">
      <div className="text-5xl flex justify-center font-extrabold">
        <span className="py-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-green-500 to-indigo-400">
          PROJECTS
        </span>
      </div>
      <div className="my-4 flex gap-x-3 justify-end items-center">
        <h1 className="text-lg">Filter</h1>
        <SelectFilter
          placeholder={"All"}
          className="w-[180px] focus:ring-offset-0 bg-transparent border-2 border-blue-700"
          items={["All", "ReactJS"]}
        />
      </div>
      <div className="flex flex-col gap-3">
        {projects.map((project, index) => (
          <ProjectItem
            className="w-full"
            key={index}
            des={project.des}
            languages={project.skill}
            img={project.img}
            name={project.name}
          />
        ))}
      </div>
    </section>
  );
}
