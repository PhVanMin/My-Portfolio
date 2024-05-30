"use client";

import { memo, useRef } from "react";

const Child1 = memo(() => {
  const count = useRef(0);
  return <div>Count: {count}</div>;
});

export { Child1 };
