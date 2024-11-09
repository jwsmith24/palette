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

  const activeCourseStyle =
    "font-bold text-purple-400 hover:opacity-80 cursor-pointer";
  const activeAssignmentStyle =
    "font-bold text-green-400 hover:opacity-80 cursor-pointer";

  // callback for Course Selection component to update
  const selectCourse = (course: Course) => {
    setIsCourseSelected(true);
    setCourse(course);
    console.log(course);
    // keep dialog open to select course
  };

  const selectAssignment = (assignment: Assignment) => {
    setIsAssignmentSelected(true);
    setAssignment(assignment);
    console.log(assignment);
    setCourseDialogOpen(false); // close the dialog when finished
  };

  // dynamically adjust dialog title
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
    <div className="h-screen grid grid-cols-1 grid-rows-[0.2fr_5fr_0.2fr] w-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white font-sans">
      <Header />
      <div
        className={
          "grid grid-rows-[0.2fr_0.8fr] gap-10 h-full justify-center justify-items-center"
        }
      >
        <div
          className={
            "mt-4 mx-4 max-w-6xl px-6 grid max-h-12 grid-cols-2 items-center bg-transparent rounded-full" +
            " ring-1 ring-purple-500 gap-4"
          }
        >
          <div className={"flex gap-2"}>
            <p>Active Course: </p>
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
          <div className={"flex gap-2"}>
            <p>Active Assignment: </p>
            {assignment ? (
              <p className={activeAssignmentStyle}>{assignment.name}</p>
            ) : (
              <button className={activeAssignmentStyle}>
                Select Assignment
              </button>
            )}
          </div>
        </div>
        <div className={"font-bold text-center text-5xl"}>Grading View TBD</div>
      </div>
      <Footer />
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
