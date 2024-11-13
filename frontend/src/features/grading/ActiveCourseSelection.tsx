import { Course } from "palette-types";

export default function ActiveCourseSelection({
  course,
  setCourseDialogOpen,
}: {
  course: Course | undefined;
  setCourseDialogOpen: (open: boolean) => void;
}) {
  const activeCourseStyle =
    "font-bold text-orange-400 hover:opacity-80 cursor-pointer";

  return (
    <div className="flex items-center gap-2">
      <p>Active Course:</p>
      {course ? (
        <p className={activeCourseStyle}>{course.name}</p>
      ) : (
        <button
          className={activeCourseStyle}
          onClick={() => setCourseDialogOpen(true)}
        >
          Select Course
        </button>
      )}
    </div>
  );
}
