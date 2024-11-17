/**
 * Component to prompt the user to select an assignment before they're able to build a rubric.
 * @constructor
 */
import AssignmentSelectionMenu from "@features/grading/AssignmentSelectionMenu.tsx";
import { Dialog } from "@components";
import { useState } from "react";

export default function NoAssignmentSelected() {
  const [assignmentMenuOpen, setAssignmentMenuOpen] = useState(false);

  return (
    <div className="self-center text-5xl font-semibold ">
      <p>
        Select an{" "}
        <button
          className={"text-green-400 hover:animate-pulse"}
          type={"button"}
          onClick={() => setAssignmentMenuOpen(true)}
        >
          Assignment
        </button>
      </p>
      <Dialog
        isOpen={assignmentMenuOpen}
        onClose={() => setAssignmentMenuOpen(false)}
        title={"Assignment Selection"}
      >
        <AssignmentSelectionMenu onSelect={setAssignmentMenuOpen} />
      </Dialog>
    </div>
  );
}
