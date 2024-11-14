/**
 * Component to prompt the user to select a course before they're able to build a rubric.
 * @constructor
 */
import { useState } from "react";
import { Dialog } from "@components";
import CourseSelectionMenu from "@features/grading/CourseSelectionMenu.tsx";

export default function NoAssignmentSelected() {
  const [courseMenuOpen, setCourseMenuOpen] = useState(false);

  return (
    <div className="self-center text-5xl font-semibold ">
      <p>
        Select a{" "}
        <button
          className={"text-orange-400 hover:animate-pulse"}
          type={"button"}
          onClick={() => setCourseMenuOpen(true)}
        >
          Course
        </button>
      </p>
      <Dialog
        isOpen={courseMenuOpen}
        onClose={() => setCourseMenuOpen(false)}
        title={"Course Selection"}
      >
        <CourseSelectionMenu onSelect={setCourseMenuOpen} />
      </Dialog>
    </div>
  );
}
