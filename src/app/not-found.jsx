"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="mt-20 flex flex-col w-full items-center">
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <div
        onClick={() => router.push("/")}
        className="cursor-pointer text-blue-600 hover:text-blue-400 underline">
        Return Home
      </div>
    </div>
  );
}
