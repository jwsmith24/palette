import { useAssignment } from "../context/AssignmentProvider.tsx";

export default function ActiveAssignmentSelection({
  setDialogOpen,
}: {
  setDialogOpen: (open: boolean) => void;
}) {
  const activeAssignmentStyle =
    "font-bold text-green-400 hover:opacity-80 cursor-pointer";

  const { activeAssignment } = useAssignment();

  return (
    <div className="flex items-center gap-2 ring-2 ring-black rounded-full p-2 relative">
      <p>Active Assignment:</p>
      <button
        className={activeAssignmentStyle}
        onClick={() => setDialogOpen(true)}
      >
        {activeAssignment ? activeAssignment.name : "Select Assignment"}
      </button>
    </div>
  );
}
