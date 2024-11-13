import { ReactElement, useEffect, useState } from "react";
import { Assignment, Course, PaletteAPIResponse } from "palette-types";
import { useFetch } from "@hooks";

export default function AssignmentSelectionMenu({
  course,
  selectAssignment,
}: {
  course: Course;
  selectAssignment: (assignment: Assignment) => void;
}): ReactElement {
  const [errorMessage, setErrorMessage] = useState<string>();
  const [assignments, setAssignments] = useState<Assignment[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  const { fetchData: getAssignments } = useFetch(
    `/courses/${course.id}/assignments`,
  );

  useEffect(() => {
    void fetchAssignments();
  }, []);

  const renderAssignments = () => {
    if (loading) return <p>Loading...</p>;
    if (errorMessage)
      return <p className="text-red-500 font-normal">Error: {errorMessage}</p>;
    if (assignments.length === 0)
      return <div>No courses available to display</div>;

    return (
      <div className={"grid gap-2 mt-0.5"}>
        Select an assignment to grade
        <div className={"grid gap-2 mt-0.5"}>
          {assignments.map((assignment: Assignment) => (
            <div
              key={assignment.id}
              className={
                "flex gap-4 bg-gray-600 hover:bg-gray-500 px-3 py-1 cursor-pointer rounded-full text-2xl font-bold"
              }
              onClick={() => handleAssignmentSelection(assignment)}
            >
              <h3>{assignment.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleAssignmentSelection = (assignment: Assignment) => {
    selectAssignment(assignment);
  };

  const fetchAssignments = async () => {
    setLoading(true);
    try {
      const response = (await getAssignments()) as PaletteAPIResponse<
        Assignment[]
      >;

      if (response.success) {
        setAssignments(response.data!);
      } else {
        setErrorMessage(response.error || "Failed to get assignments");
      }
    } catch (error) {
      console.error(
        "An unexpected error occurred while getting assignments: ",
        error,
      );
      setErrorMessage(
        "An unexpected error occurred while fetching assignments.",
      );
    }
    setLoading(false);
  };

  return (
    <div>
      Assignments for {course.name}
      <div>{renderAssignments()}</div>
    </div>
  );
}
