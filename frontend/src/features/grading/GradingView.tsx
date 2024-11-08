import { MouseEvent, ReactElement, useState } from "react";
import { Header, Footer } from "@components";
import { useFetch } from "@hooks";

export default function GradingView(): ReactElement {
  const [message, setMessage] = useState("WANT TO SEE COURSES?");

  // useFetch hook for get all courses
  // we can deconstruct the response out if we need it in state
  const { fetchData: getCourses } = useFetch(
    "/courses",
    {}, // no extra options for GET
  );

  const handleGetCourses = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    void (async () => {
      // use void to tell typescript we're not going to use the promise since we update state with
      // everything we need.
      try {
        const response = await getCourses(); // Trigger the GET request
        console.log(response);

        // Set the message based on the response
        if (response.success) {
          setMessage(JSON.stringify(response.data ?? "No courses found"));
        } else {
          setMessage(response.error || "Failed to get courses");
        }
      } catch (error) {
        console.error("Error getting courses: ", error);
        setMessage("An error occurred while fetching courses.");
      }
    })(); // IIFE since onClick needs a void instead of Promise<void>
  };

  return (
    <div className="min-h-screen justify-between flex flex-col w-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white font-sans">
      <Header />
      <div className={"grid gap-10"}>
        <div className={"font-bold text-center text-5xl"}>{message}</div>
        <button
          className={"text-3xl font-bold"}
          onClick={(event) => handleGetCourses(event)}
        >
          Click This
        </button>
      </div>
      <Footer />
    </div>
  );
}
