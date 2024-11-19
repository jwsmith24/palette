import { useEffect, useState } from "react";

export default function ProgressBar({ progress }: { progress: number }) {
  const [progressBarColor, setProgressBarColor] =
    useState<string>("bg-green-500");

  useEffect(() => {
    setProgressBarColor(
      progress > 70
        ? "bg-green-500"
        : progress > 50
          ? "bg-yellow-600"
          : "bg-red-500",
    );
  });
  return (
    <div className="bg-gray-800 p-2 rounded-2xl items-center grid">
      <div className="relative w-full h-6 bg-gray-900 rounded-2xl overflow-hidden grid">
        <div
          className={`absolute top-0 left-0 h-full ${progressBarColor} hover:cursor-pointer`}
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      <h2
        className={`p-1 text-white absolute justify-self-center font-extrabold`}
      >
        {progress}% Graded
      </h2>
    </div>
  );
}
