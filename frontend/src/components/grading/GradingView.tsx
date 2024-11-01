import { ReactElement } from "react";
import Header from "../util/Header.tsx";
import Footer from "../util/Footer.tsx";

export default function GradingView(): ReactElement {
  return (
    <div className="min-h-screen justify-between flex flex-col w-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white font-sans">
      <Header />
      <div className={"font-bold text-center text-5xl"}>
        FUTURE CONTENT RELATED TO GRADING
      </div>
      <Footer />
    </div>
  );
}
