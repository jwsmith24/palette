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

  // callback for Course Selection component to update
  const selectCourse = (course: Course) => {
    setIsCourseSelected(true);
    setCourse(course);
    console.log(course);
  };

  const selectAssignment = (assignment: Assignment) => {
    setIsAssignmentSelected(true);
    setAssignment(assignment);
    console.log(assignment);
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
    <div className="min-h-screen justify-between flex flex-col w-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white font-sans">
      <Header />
      <div className={"grid gap-10"}>
        {course && <div>Active Course: {course.name}</div>}
        <div className={"font-bold text-center text-5xl"}>Grading View</div>
        <button
          className={"text-3xl font-bold"}
          onClick={() => setCourseDialogOpen(true)}
        >
          {isCourseSelected ? "Change Course" : "Select a Course"}
        </button>
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
