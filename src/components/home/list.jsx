import ListComponent from "./list_component";
import { useInView } from "@/utils/useInView";

export default function List({ listInfo, shadow = false, size = 150 }) {
  const { ref, isInView } = useInView({ triggerOnce: true });
  return (
    <section
      ref={ref}
      className={`${
        isInView ? "opacity-100" : "opacity-0"
      } transition-opacity duration-1000 pt-[2%] pb-[4%]`}>
      <h1 className="text-2xl font-extrabold mb-10">{listInfo.name}</h1>
      <ul className="flex flex-wrap justify-center gap-8">
        {listInfo.data.map((data, index) => (
          <li
            className="group hover:cursor-pointer hover:scale-[120%] transition-transform"
            key={index}>
            <ListComponent
              name={data.name}
              size={size}
              shadow={shadow}
              image_src={`${listInfo.path}/${data.image}`}
            />
          </li>
        ))}
      </ul>
    </section>
  );
}
