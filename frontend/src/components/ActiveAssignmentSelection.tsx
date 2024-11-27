import { useAssignment } from "@context";
import { ReactElement } from "react";
import { ActiveSelectionWidget } from "@components";

export default function ActiveAssignmentSelection({
  setDialogOpen,
}: {
  setDialogOpen: (open: boolean) => void;
}): ReactElement {
  // Assignment Context
  const { activeAssignment } = useAssignment();

  return (
    <ActiveSelectionWidget
      setDialogOpen={setDialogOpen}
      activeContext={activeAssignment}
      label={activeAssignment?.name || "Assignment"}
      buttonStyle="font-bold text-green-400 hover:opacity-80 cursor-pointer"
    />
  );
}
