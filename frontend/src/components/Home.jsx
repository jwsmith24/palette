import {useState} from "react";

export default function Home() {
    const options = ["red", "orange", "violet"];
    const [color, setColor] = useState("gray")

    function randomColor() {
        let max = options.length;
        let randomInt = Math.floor(Math.random() * max);

        console.log(options[randomInt])
        return options[randomInt];
    }

    const handleMouseEnter = () => {
        setColor(randomColor());
    }

    return (
        <div className={" text-white bg-gray-800 h-dvh w-dvw grid items-center justify-center"}>
            <div>
                <h1 className={"font-sans font-bold text-5xl"}>Welcome to Palette</h1>
                <div className={"flex justify-center p-2 gap-3 text-black font-bold"}>
                    <button className={"bg-gray-600 rounded pl-3 pr-3 hover:opacity-70 active:opacity-60 transition duration-400 ease-in-out transform hover:scale-105"}
                            onMouseEnter={handleMouseEnter}
                            style={{backgroundColor: color}}
                    >Log In
                    </button>
                    <button
                        className={"text-white bg-gray-600 rounded pl-3 pr-3 hover:opacity-70 active:opacity-60 transition duration-400 ease-in-out transform hover:scale-105"}
                    >Sign Up
                    </button>
                </div>
            </div>
        </div>
    )
}