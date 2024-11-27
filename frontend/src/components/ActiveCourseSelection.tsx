import { useCourse } from "../context/CourseProvider.tsx";
import { ReactElement } from "react";
import { ActiveSelectionWidget } from "@components";

export default function ActiveCourseSelection({
  setDialogOpen,
}: {
  setDialogOpen: (open: boolean) => void;
}): ReactElement {
  // Course Context
  const { activeCourse } = useCourse();

  return (
    <ActiveSelectionWidget
      setDialogOpen={setDialogOpen}
      activeContext={activeCourse}
      label={activeCourse?.name || "Course"}
      buttonStyle="font-bold text-orange-400 hover:opacity-80 cursor-pointer"
    />
  );
}
