/**
 * Generic selector widget that tracks the active context for course, assignment, etc. and triggers the dialog for
 * user updates.
 */
import { ReactElement } from "react";
import { Assignment, Course } from "palette-types";

type ActiveContext = Assignment | Course;

export function ActiveSelectionButton({
  setDialogOpen,
  activeContext,
  label,
  buttonStyle,
}: {
  buttonStyle: string;
  label: string;
  activeContext: ActiveContext | null;
  setDialogOpen: (open: boolean) => void;
}): ReactElement {
  return (
    <button
      className={`bg-gray-500 text-center rounded-full px-3 py-1 font-bold hover:bg-gray-600 cursor-pointer transition duration-300 transform hover:scale-105 ${buttonStyle} `}
      onClick={() => setDialogOpen(true)}
      aria-label={"open selection modal"}
    >
      {activeContext ? activeContext.name : `Select ${label}`}
    </button>
  );
}
