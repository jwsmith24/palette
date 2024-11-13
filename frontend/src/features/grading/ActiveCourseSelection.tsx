import { useCourse } from "src/context/CourseProvider.tsx";

export default function ActiveCourseSelection({
  setDialogOpen,
}: {
  setDialogOpen: (open: boolean) => void;
}) {
  const activeCourseStyle =
    "font-bold text-orange-400 hover:opacity-80 cursor-pointer";

  /**
   * Use the Course context for consistent state across the application
   */
  const { activeCourse } = useCourse();

  return (
    <div className="flex items-center gap-2 ring-2 ring-black rounded-full p-2">
      <p>Active Course:</p>
      {activeCourse ? (
        <p className={activeCourseStyle}>{activeCourse.name}</p>
      ) : (
        <button
          className={activeCourseStyle}
          onClick={() => setDialogOpen(true)}
        >
          Select Course
        </button>
      )}
    </div>
  );
}
