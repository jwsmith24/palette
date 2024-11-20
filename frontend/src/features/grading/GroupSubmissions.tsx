import IndividualSubmission from "@features/grading/IndividualSubmission.tsx";
import ProgressBar from "@features/grading/ProgressBar.tsx";
import { Submission } from "palette-types";

export default function GroupSubmissions({
  groupName,
  progress,
  isExpanded,
  submissions,
}: {
  groupName: string;
  progress: number;
  isExpanded: boolean;
  submissions: Submission[];
}) {
  const renderGroupHeader = () => {
    return (
      <div className={"grid gap-4 items-center justify-between"}>
        <div className={"grid grid-rows-1 grid-cols-[15fr,1fr] gap-4 "}>
          <h1 className={"text-4xl font-bold"}>{groupName}</h1>
          <button
            type={"button"}
            className={
              "bg-white rounded-xl p-1 relative top-1 hover:bg-blue-400"
            }
            onClick={() => alert("To the grading view!")}
            title={"Grade this Group"}
          >
            <img
              src="/drop-down-arrow.png"
              alt="Show/Hide Group Submissions"
              className={"h-6 cursor-pointer -rotate-90"}
            />
          </button>
        </div>
        <ProgressBar progress={progress} />
      </div>
    );
  };

  const renderSubmissions = () => {
    return (
      <div className={"mt-2 grid gap-2"}>
        {submissions.map((submission, index) => (
          <IndividualSubmission submission={submission} key={index} />
        ))}
      </div>
    );
  };

  return (
    <div
      className={`grid m-2 p-6 border border-gray-400 border-opacity-35 shadow-xl rounded-2xl overflow-hidden items-center`}
    >
      {renderGroupHeader()}
      {isExpanded && renderSubmissions()}
    </div>
  );
}
