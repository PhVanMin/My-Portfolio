"use client";

import { AddFile } from "@/database/storage";
import { useState } from "react";

export default function Admin() {
  const [disable, setDisable] = useState(false);
  const [status, setStatus] = useState(null);
  const handleSubmit = async (formData) => {
    setDisable(true);
    const file = formData.get("file");
    if (file.size) {
      const status = await AddFile(`/musics/${file.name}`, file);
      setStatus(status);
      document.getElementById("musicForm").reset();
    }
    setDisable(false);
  };

  return (
    <div className="flex justify-center items-center">
      <form
        id="musicForm"
        action={handleSubmit}
        className="grid gap-4 bg-gray-700/40 p-5 rounded-xl">
        <h1 className="text-center text-2xl font-bold">Music</h1>
        <div>
          <input
            type="file"
            name="file"
            className="rounded bg-white block w-full text-sm text-slate-500
        file:mr-4 file:py-2 file:px-4
        file:border-0 file:text-sm file:font-semibold
        file:bg-blue-200 file:text-blue-700
        hover:file:bg-blue-400"
          />
        </div>
        <button
          disabled={disable}
          className="shadow bg-purple-500 hover:bg-purple-400 focus:outline-none text-white font-bold py-2 px-4 rounded"
          type="submit">
          Add music
        </button>
        {status !== null &&
          (status ? (
            <div className="text-green-500">Upload successful!</div>
          ) : (
            <div className="text-red-500">Upload fail!</div>
          ))}
      </form>
    </div>
  );
}
