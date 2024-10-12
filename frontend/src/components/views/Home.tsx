import { ReactElement, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Home(): ReactElement {
  const options: string[] = ["red", "yellow", "green", "blue", "purple"]; // color pool for the button hover effect
  const [color, setColor] = useState("red"); // state hook for the button hover effect

  const navigate = useNavigate(); // enables programmatic client-side routing

  // used to determine a color at random from the pool for the button hover effect
  function randomColor(): string {
    let max = options.length;
    let randomInt = Math.floor(Math.random() * max);
    return options[randomInt];
  }

  const handleMouseEnter = () => {
    setColor(randomColor());
  };

  //todo - placeholder. Eventually we'll implement the login/authentication logic from here but for now it just
  // routes to the rubric builder view.
  const handleLogin = () => {
    navigate("/rubric-builder");
  };

  const handleSignUp = () => {
    navigate("/sandbox");
  };

  return (
    <div
      className={
        "h-screen w-dvw bg-gray-800 grid grid-rows-[auto_1fr_auto] grid-cols-1"
      }
    >
      <div
        className={
          "bg-gradient-to-r from-red-500 via-green-500 to-purple-500 h-8"
        }
      ></div>
      <div
        className={
          " text-white grid h-full items-center justify-center content-center"
        }
      >
        <h1 className={"text-center font-sans font-bold text-5xl"}>
          Welcome to Palette
        </h1>
        <div className={"flex justify-center p-2 gap-3 text-black font-bold"}>
          <button
            className={`bg-${color}-500 rounded pl-3 pr-3 hover:opacity-70 active:opacity-60 transition duration-400 ease-in-out transform hover:scale-110`}
            onMouseEnter={handleMouseEnter}
            onClick={handleLogin}
          >
            Log In
          </button>
          <button
            className={
              "text-white bg-gray-600 rounded pl-3 pr-3 hover:opacity-70 active:opacity-60 transition duration-400 ease-in-out transform hover:scale-110"
            }
            onClick={handleSignUp}
          >
            Sign Up
          </button>
        </div>
        <div id="info">
          <p className={"text-xl"}>
            Create the perfect Canvas rubric and improve the project grading
            experience.
          </p>
        </div>
      </div>
    </div>
  );
}
