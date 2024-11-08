/**
 * Course Selection component.
 *
 * When the user selects the grading view, this component will display the results of the request to show courses
 * they are authorized to grade.
 */
import { MouseEvent, ReactElement, useEffect, useState } from "react";
import { useFetch } from "@hooks";
import { Course } from "palette-types";

export default function CourseSelection(): ReactElement {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [courses, setCourses] = useState<Course[]>([]);

  const { fetchData: getCourses } = useFetch(
    "/courses",
    {}, // no extra options for GET
  );

  /**
   * Run fetchCourses when component initially mounts.
   */
  useEffect(() => {
    void fetchCourses();
  }, []);

  /**
   * Get all courses the user is authorized to grade.
   */
  const fetchCourses = async () => {
    try {
      const response = await getCourses(); // Trigger the GET request
      console.log(response);

      // Set the message based on the response
      // todo: parse response into course objects and display!
      if (response.success) {
        setErrorMessage(JSON.stringify(response.data ?? "No courses found"));
      } else {
        setErrorMessage(response.error || "Failed to get courses");
      }
    } catch (error) {
      console.error("Error getting courses: ", error);
      setErrorMessage("An error occurred while fetching courses.");
    }
  };

  /**
   * Wrapper for fetchCourses when triggered by a click event on the refresh button.
   * @param event - user clicks the "refresh" button
   */
  const handleGetCourses = (event: MouseEvent<HTMLButtonElement>): void => {
    event.preventDefault();
    void fetchCourses();
  };
  return (
    <div>
      <div>{errorMessage}</div>
      <div></div>
      <button onClick={handleGetCourses}>Refresh</button>
    </div>
  );
}
