import { ReactElement } from "react";

export default function LoadingDots(): ReactElement {
  return (
    <div className="flex space-x-2">
      <div className="w-3 h-3 bg-red-500 rounded-full animate-bounce"></div>
      <div className="w-3 h-3 bg-green-500 rounded-full animate-bounce animation-delay-200"></div>
      <div className="w-3 h-3 bg-blue-500 rounded-full animate-bounce animation-delay-400"></div>
    </div>
  );
}
