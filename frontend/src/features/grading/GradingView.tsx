import { ReactElement, useEffect, useState } from "react";
import { Dialog, Footer, Header } from "@components";
import CourseSelectionMenu from "@features/grading/CourseSelectionMenu.tsx";
import { Assignment, PaletteAPIResponse, Rubric } from "palette-types";
import AssignmentSelectionMenu from "@features/grading/AssignmentSelectionMenu.tsx";
import { useFetch } from "@hooks";
import ActiveCourseSelection from "@features/grading/ActiveCourseSelection.tsx";
import { v4 as uuid } from "uuid";
import ActiveAssignmentSelection from "@features/grading/ActiveAssignmentSelection.tsx";
import { useCourse } from "src/context/CourseProvider";

export default function GradingView(): ReactElement {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState("Course Selection");
  const [isAssignmentSelected, setIsAssignmentSelected] = useState(false);
  const [assignment, setAssignment] = useState<Assignment>();
  const [rubricId, setRubricId] = useState<number>();

  const [rubric, setRubric] = useState<Rubric>();
  const [rubricErrorMessage, setRubricErrorMessage] = useState<string>();
  const [loading, setLoading] = useState(false);

  const { fetchData: getRubric } = useFetch(
    `/courses/15760/rubrics/${rubricId}`,
  );

  const resetStyle =
    "font-bold text-white-400 cursor-pointer hover:text-red-400";

  const hasValidRubricId = rubricId && rubricId !== -1;

  const { activeCourse } = useCourse();

  const selectAssignment = (assignment: Assignment) => {
    setIsAssignmentSelected(true);
    setAssignment(assignment);
    setRubricId(assignment.rubricId);
    setDialogOpen(false);
  };

  const resetSelections = () => {
    setIsAssignmentSelected(false);
    setAssignment(undefined);
    setRubricId(undefined);
    setRubric(undefined);
    setRubricErrorMessage(undefined);
  };

  useEffect(() => {
    if (activeCourse && !isAssignmentSelected) {
      setDialogTitle("Assignment Selection");
    } else if (activeCourse && isAssignmentSelected) {
      setDialogTitle("Assignment Grading View");
    }
  }, [activeCourse, isAssignmentSelected]);

  useEffect(() => {
    // prevent effect if either course or assignment is not selected
    if (!activeCourse || !isAssignmentSelected) {
      return;
    }

    // reset rubric state for clean slate prior to fetch
    setRubric(undefined);
    setRubricErrorMessage(undefined);

    if (hasValidRubricId) {
      setLoading(true);
      void fetchRubric();
    } else {
      // reset rubric state, inform user that the assignment doesn't have a rubric
      setLoading(false);
      setRubricId(undefined);
      setRubricErrorMessage(
        "This assignment does not have an associated rubric.",
      );
    }
  }, [rubricId]);

  const fetchRubric = async () => {
    try {
      const response = (await getRubric()) as PaletteAPIResponse<Rubric>;
      console.log("Received rubric: ", response);
      if (response.success) {
        console.log("success!");
        setRubric(response.data);
      } else {
        setRubricErrorMessage(response.error);
      }
    } catch (error) {
      console.error("An unexpected error occurred while getting rubric", error);
      setRubricErrorMessage("An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (!activeCourse) {
      return <CourseSelectionMenu />;
    }
    if (!isAssignmentSelected) {
      return <AssignmentSelectionMenu selectAssignment={selectAssignment} />;
    }
    return <div>Assignment Grading View</div>;
  };

  return (
    <div className="h-screen w-screen grid grid-cols-1 grid-rows-[0.2fr_5fr_0.2fr] bg-gradient-to-b from-gray-900 to-gray-700 text-white font-sans">
      <Header />

      <div className="grid h-full w-full grid-rows-[1fr_10fr] gap-10 place-items-center">
        {/* Active Course and Assignment Section */}
        <div className="max-w-6xl w-full p-6 grid max-h-12 grid-cols-[5fr_5fr_1fr] items-center bg-transparent rounded-full ring-1 ring-purple-500 gap-4 content-center">
          <ActiveCourseSelection key={uuid()} setDialogOpen={setDialogOpen} />

          <ActiveAssignmentSelection
            assignment={assignment}
            setDialogOpen={setDialogOpen}
            key={uuid()}
          />

          <button className={resetStyle} onClick={resetSelections}>
            Reset
          </button>
        </div>

        {/* Content Section */}
        <div className="text-center font-bold text-5xl">
          {loading
            ? "Loading..."
            : (rubric && rubric.title) || rubricErrorMessage}
        </div>
      </div>

      <Footer />

      {/* Dialog for Course/Assignment Selection */}
      <Dialog
        isOpen={dialogOpen}
        onClose={() => setDialogOpen(false)}
        title={dialogTitle}
      >
        {renderContent()}
      </Dialog>
    </div>
  );
}
