import { Assignment } from "palette-types";

export default function ActiveAssignmentSelection({
  assignment,
  setDialogOpen,
}: {
  assignment: Assignment | undefined;
  setDialogOpen: (open: boolean) => void;
}) {
  const activeAssignmentStyle =
    "font-bold text-green-400 hover:opacity-80 cursor-pointer";

  return (
    <div className="flex items-center gap-2">
      <p>Active Assignment:</p>
      {assignment ? (
        <p className={activeAssignmentStyle}>{assignment.name}</p>
      ) : (
        <button
          className={activeAssignmentStyle}
          onClick={() => setDialogOpen(true)}
        >
          Select Assignment
        </button>
      )}
    </div>
  );
}
