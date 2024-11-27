/**
 * Generic selector widget that tracks the active context for course, assignment, etc. and triggers the dialog for
 * user updates.
 */
import { ReactElement } from "react";
import { Assignment, Course } from "palette-types";

type ActiveContext = Assignment | Course;

export function ActiveSelectionWidget({
  textColor,
  activeContext,
  modalTrigger,
}: {
  textColor: string;
  activeContext: ActiveContext;
  modalTrigger: (setOpen: boolean) => void;
}): ReactElement {
  const baseStyle = `font-bold hover:opacity-80 cursor-pointer `;

  /**
   * Type guard to determine if we're dealing with a course or assignment object.
   * @param context
   */
  const isCourseContext = (context: ActiveContext): context is Course => {
    return "termId" in context;
  };

  return (
    <div
      className="flex items-center gap-2 ring-2 ring-black rounded-full p-2 relative"
      role={"group"}
    >
      <p className={"text-gray-700"} aria-label={"active selection widget"}>
        {isCourseContext(activeContext) ? "Active Course" : "Active Assignment"}
      </p>
      <button
        className={`${baseStyle}  ${textColor}`} // dynamically set text-color
        onClick={() => modalTrigger(true)}
        aria-label={"open selection modal"}
      >
        {isCourseContext(activeContext)
          ? activeContext.name
          : "Select Assignment"}
      </button>
    </div>
  );
}
