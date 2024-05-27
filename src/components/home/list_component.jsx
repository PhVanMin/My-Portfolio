import Image from "next/image";

export default function ListComponent({ size, shadow, image_src, name }) {
  return (
    <div className="text-center ">
      <div
        style={{
          height: size + "px",
          width: size + "px",
        }}
        className={`rounded overflow-hidden relative ${
          shadow && "group-hover:drop-shadow-3xl"
        }`}>
        <Image
          className="object-cover"
          src={image_src}
          alt="Image"
          fill={true}
          sizes={`${size}`}
          priority
        />
      </div>
      <p className="mt-2">{name}</p>
    </div>
  );
}
