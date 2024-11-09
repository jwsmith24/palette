import { ReactElement, useState } from "react";
import { Header, Footer, Dialog } from "@components";

import CourseSelection from "@features/grading/CourseSelection.tsx";
import { Course } from "palette-types";

export default function GradingView(): ReactElement {
  const [courseDialogOpen, setCourseDialogOpen] = useState(false);
  const [dialogTitle, setDialogTitle] = useState<string>("Course Selection");
  const [isCourseSelected, setIsCourseSelected] = useState(false);
  const [course, setCourse] = useState<Course>();
  const [isAssignmentSelected, setIsAssignmentSelected] = useState(false);

  const selectCourse = (course: Course) => {
    setIsCourseSelected(true);
    setCourse(course);
  };

  const renderContent = () => {
    if (!isCourseSelected) {
      return <CourseSelection selectCourse={selectCourse} />;
    } else if (!isAssignmentSelected) {
      return <div>choose assignments</div>;
    }
  };
  return (
    <div className="min-h-screen justify-between flex flex-col w-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white font-sans">
      <Header />
      <div className={"grid gap-10"}>
        <div className={"font-bold text-center text-5xl"}>Grading View</div>
        <button
          className={"text-3xl font-bold"}
          onClick={() => setCourseDialogOpen(true)}
        >
          Click for Courses!
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
