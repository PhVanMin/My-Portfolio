"use client";

import { useRef, useState, memo, useCallback } from "react";
// import { Child1 } from "./child1";

const Child1 = memo(({ count }) => {
  console.log("1");
  return (
    <>
      <div>Count: {count}</div>
      <input className="text-black" />
    </>
  );
});

const Child2 = memo(({ onClick }) => {
  console.log("2");
  return (
    <div onClick={onClick} className="bg-red-300 p-2">
      Click me
    </div>
  );
});

export default function Playground() {
  console.log("parent render");
  const [count, setCount] = useState(0);
  const handleClick = useCallback(() => {
    setCount((count) => count + 1);
  }, []);
  return (
    <div className="mt-20 grid place-items-center gap-y-2">
      <Child1 count={count} />
      <Child2 onClick={handleClick} />
    </div>
  );
}
