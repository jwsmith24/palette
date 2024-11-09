import { ReactElement, useEffect, useState } from "react";
import { Header, Footer, Dialog } from "@components";
import CourseSelection from "@features/grading/CourseSelection.tsx";
import { Assignment, Course } from "palette-types";
import AssignmentSelection from "@features/grading/AssignmentSelection.tsx";

export default function GradingView(): ReactElement {
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState<string>("Course Selection");
  const [isCourseSelected, setIsCourseSelected] = useState(false);
  const [course, setCourse] = useState<Course>();
  const [isAssignmentSelected, setIsAssignmentSelected] = useState(false);
  const [assignment, setAssignment] = useState<Assignment>();
  const [rubricId, setRubricId] = useState<string>();

  const activeCourseStyle =
    "font-bold text-orange-400 hover:opacity-80 cursor-pointer";
  const activeAssignmentStyle =
    "font-bold text-green-400 hover:opacity-80 cursor-pointer";
  const resetStyle =
    "font-bold text-white-400 cursor-pointer hover:text-red-400";

  /**
   * Updates state for new course selection.
   * @param course - target course for grading
   */
  const selectCourse = (course: Course) => {
    setIsCourseSelected(true);
    setCourse(course);
    setCourseDialogOpen(false);
  };

  /**
   * Updates state for new assignment selection.
   * @param assignment - target assignment for grading
   */
  const selectAssignment = (assignment: Assignment) => {
    setIsAssignmentSelected(true);
    setAssignment(assignment);
    setRubricId(assignment.rubricId);
    setCourseDialogOpen(false);
  };

  const resetSelections = () => {
    setIsCourseSelected(false);
    setIsAssignmentSelected(false);
    setCourse(undefined);
    setAssignment(undefined);
    setRubricId(undefined);
  };

  useEffect(() => {
    if (isCourseSelected && !isAssignmentSelected) {
      setDialogTitle("Assignment Selection");
    } else if (isCourseSelected && isAssignmentSelected) {
      setDialogTitle("Assignment Grading View");
    }
  }, [isCourseSelected, isAssignmentSelected]);

  const renderContent = () => {
    if (!isCourseSelected) {
      return <CourseSelection selectCourse={selectCourse} />;
    }
    if (!isAssignmentSelected) {
      return (
        <AssignmentSelection
          course={course!}
          selectAssignment={selectAssignment}
        />
      );
    }
    return <div>Assignment Grading View</div>;
  };

  return (
    <div className="h-screen w-screen grid grid-cols-1 grid-rows-[0.2fr_5fr_0.2fr] bg-gradient-to-b from-gray-900 to-gray-700 text-white font-sans">
      <Header />

      <div className="grid h-full w-full grid-rows-[1fr_10fr] gap-10 place-items-center">
        {/* Active Course and Assignment Section */}
        <div
          className="
            max-w-6xl w-full p-6 grid max-h-12 grid-cols-[5fr_5fr_1fr]
            items-center bg-transparent rounded-full
            ring-1 ring-purple-500 gap-4 content-center
          "
        >
          <div className="flex items-center gap-2">
            <p>Active Course:</p>
            {course ? (
              <p className={activeCourseStyle}>{course.name}</p>
            ) : (
              <button
                className={activeCourseStyle}
                onClick={() => setCourseDialogOpen(true)}
              >
                Select Course
              </button>
            )}
          </div>

          <div className="flex items-center gap-2">
            <p>Active Assignment:</p>
            {assignment ? (
              <p className={activeAssignmentStyle}>{assignment.name}</p>
            ) : (
              <button
                className={activeAssignmentStyle}
                onClick={() => setCourseDialogOpen(true)}
              >
                Select Assignment
              </button>
            )}
          </div>

          <button className={resetStyle} onClick={resetSelections}>
            Reset
          </button>
        </div>

        {/* Content Section */}
        <div className="text-center font-bold text-5xl">
          {assignment && assignment.rubricId}
        </div>
      </div>

      <Footer />

      {/* Dialog for Course/Assignment Selection */}
      <Dialog
        isOpen={courseDialogOpen}
        onClose={() => setCourseDialogOpen(false)}
        title={dialogTitle}
      >
        {renderContent()}
      </Dialog>
    </div>
  );
}
