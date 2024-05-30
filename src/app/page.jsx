import Info from "@/components/home/info";
import List from "@/components/home/list";

const skillListInfo = {
  path: "/skills",
  data: [
    { name: "C/C++", image: "c.png" },
    { name: "C#", image: "c-sharp.png" },
    { name: "Java", image: "java.png" },
    { name: "JavaScript", image: "js.png" },
    { name: "Python", image: "python.png" },
  ],
  name: "My Skills",
};

const hobbieListInfo = {
  path: "/hobbies",
  data: [
    { name: "Coding", image: "coding.png" },
    { name: "Gaming", image: "gaming.jpeg" },
    { name: "Football", image: "football.jpg" },
    { name: "Music", image: "music.jpeg" },
    { name: "Movie", image: "movie.jpg" },
  ],
  name: "My Hobbies",
};

export default function Home() {
  return (
    <div className="divide-y divide-white/60 px-4">
      <Info />
      <List listInfo={skillListInfo} />
      <List shadow listInfo={hobbieListInfo} />
    </div>
  );
}
