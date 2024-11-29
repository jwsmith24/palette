/**
 * Core functionality and styles for context selection buttons. Intended use is for specialized components to wrap
 * this base and implement their unique data fetching/handling.
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
