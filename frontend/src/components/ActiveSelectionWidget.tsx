/**
 * Generic selector widget that tracks the active context for course, assignment, etc. and triggers the dialog for
 * user updates.
 */
import { ReactElement } from "react";
import { Assignment, Course } from "palette-types";

type ActiveContext = Assignment | Course;

export function ActiveSelectionWidget({
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
    <div
      className={
        "flex items-center gap-2 ring-2 ring-gray-400 ring-opacity-100 rounded-full p-2 relative"
      }
      role={"group"}
    >
      <p className={"text-gray-700"} aria-label={"active selection widget"}>
        {label}
      </p>
      <button
        className={buttonStyle}
        onClick={() => setDialogOpen(true)}
        aria-label={"open selection modal"}
      >
        {activeContext ? activeContext.name : `Select ${label}`}
      </button>
    </div>
  );
}
