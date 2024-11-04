import { MouseEvent, ReactElement, useState } from "react";
import Header from "../../components/Header.tsx";
import Footer from "../../components/Footer.tsx";
import useFetch from "../../hooks/useFetch.ts";

export default function GradingView(): ReactElement {
  const [message, setMessage] = useState("WANT TO SEE COURSES?");

  // useFetch hook for get all courses
  const { response: getAllCoursesResponse, fetchData: getCourses } = useFetch(
    "/courses",
    {}, // no extra options for GET
  );

  const handleGetCourses = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();

    // Immediately invoke an async function to handle the async logic
    void (async () => {
      // use void to tell typescript we're not going to use the promise since we update state with
      // everything we need.
      try {
        await getCourses(); // Trigger the GET request

        // Set the message based on the response
        if (getAllCoursesResponse.success) {
          setMessage(
            JSON.stringify(getAllCoursesResponse.data ?? "No courses found"),
          );
        } else {
          setMessage(getAllCoursesResponse.error || "Failed to get courses");
        }
      } catch (error) {
        console.error("Error getting courses: ", error);
        setMessage("An error occurred while fetching courses.");
      }
    })();
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
