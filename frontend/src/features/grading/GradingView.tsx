import { ReactElement } from "react";
import Header from "../../components/Header.tsx";
import Footer from "../../components/Footer.tsx";

export default function GradingView(): ReactElement {
  //const handleGetCourses = () => {};

  return (
    <div className="min-h-screen justify-between flex flex-col w-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white font-sans">
      <Header />
      <div className={"grid gap-10"}>
        <div className={"font-bold text-center text-5xl"}>
          WANT TO SEE COURSES?
        </div>
        <button className={"text-3xl font-bold"}>Click This</button>
      </div>
      <Footer />
    </div>
  );
}
