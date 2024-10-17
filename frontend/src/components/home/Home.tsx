import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(): ReactElement {
  const options: string[] = ["red", "yellow", "green", "blue", "purple"];
  const [color, setColor] = useState("red");
  const navigate = useNavigate();

  function randomColor(): string {
    let max = options.length;
    let randomInt = Math.floor(Math.random() * max);
    return options[randomInt];
  }

  const handleMouseEnter = () => {
    setColor(randomColor());
  };

  const handleLogin = () => {
    navigate("/rubric-builder");
  };

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <div className="h-screen w-full bg-gradient-to-br from-gray-800 via-gray-900 to-black flex flex-col justify-between">
      {/* Header Bar */}
      <div className="h-12 bg-gradient-to-r from-red-500 via-green-500 to-purple-500"></div>

      {/* Main Content Section */}
      <div className="flex flex-col items-center justify-center text-white text-center">
        {/* Logo */}
        <img
          src="/palette-2.webp"
          alt="Palette Logo"
          width={350}
          className={"mb-2 rounded-full"}
        />

        {/* Title */}
        <h1 className="text-6xl font-bold mb-4 tracking-wide">
          Welcome to Palette
        </h1>

        {/* Subtitle */}
        <p className="text-xl text-gray-400 mb-8 max-w-lg">
          Improve the Canvas project grading experience with the perfect rubric.
        </p>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            className={`bg-${color}-500 text-white rounded-lg px-8 py-3 font-semibold hover:opacity-80 transition duration-300 transform hover:scale-105`}
            onMouseEnter={handleMouseEnter}
            onClick={handleLogin}
          >
            Log In
          </button>
          <button
            className="bg-gray-600 text-white rounded-lg px-8 py-3 font-semibold hover:bg-gray-500 transition duration-300 transform hover:scale-105"
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="h-12 bg-gradient-to-r from-red-500 via-green-500 to-purple-500"></div>
    </div>
  );
}
