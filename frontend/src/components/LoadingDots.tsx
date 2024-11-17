import { ReactElement } from "react";

export default function LoadingDots(): ReactElement {
  return (
    <div className="flex place-self-center space-x-2">
      <div
        className="w-3 h-3 bg-red-500 rounded-full animate-bounce"
        style={{ animationDelay: "0s" }}
      ></div>
      <div
        className="w-3 h-3 bg-green-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.2s" }}
      ></div>
      <div
        className="w-3 h-3 bg-blue-500 rounded-full animate-bounce"
        style={{ animationDelay: "0.4s" }}
      ></div>
    </div>
  );
}
