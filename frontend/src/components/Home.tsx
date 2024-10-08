import {ReactElement, useState} from "react";
import {useNavigate} from "react-router-dom";

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
    }

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
