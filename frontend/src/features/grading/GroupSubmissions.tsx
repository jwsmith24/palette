import IndividualSubmission from "@features/grading/IndividualSubmission.tsx";
import { Submission } from "palette-types";
import { useState } from "react";
import ProgressBar from "@features/grading/ProgressBar.tsx";

export default function GroupSubmissions({ groupName }: { groupName: string }) {
  const [progress, setProgress] = useState<number>(68);

  const dummySubmissions: Submission[] = [
    {
      id: 1,
      comment: "Very nice comment",
      isGroupComment: false,
      rubricAssessment: [],
      user: {
        id: 1,
        name: "Manuel Sanchez",
        asurite: "msanc156",
      },
      graded: true,
      late: false,
      missing: false,
      attachments: [
        {
          fileName: "Essay1.docx",
          url: "https://canvas.asu.edu/files/12345/download?download_frd=1",
        },
        {
          fileName: "Rubric.pdf",
          url: "https://canvas.asu.edu/files/12346/download?download_frd=1",
        },
      ],
    },
    {
      id: 2,
      comment: "Very average comment",
      isGroupComment: false,
      rubricAssessment: [],
      user: {
        id: 2,
        name: "Matt Anderson",
        asurite: "mmande34",
      },
      graded: false,
      late: true,
      missing: false,
      attachments: [
        {
          fileName: "ProjectReport.pdf",
          url: "https://canvas.asu.edu/files/12347/download?download_frd=1",
        },
      ],
    },
    {
      id: 3,
      comment: "Very bad comment",
      isGroupComment: false,
      rubricAssessment: [],
      user: {
        id: 3,
        name: "Test Student",
        asurite: "test1234",
      },
      graded: false,
      late: false,
      missing: true,
      attachments: [],
    },
    {
      id: 4,
      rubricAssessment: [],
      user: {
        id: 4,
        name: "Alice Johnson",
        asurite: "ajohn789",
      },
      graded: true,
      attachments: [
        {
          fileName: "LabReport.docx",
          url: "https://canvas.asu.edu/files/12348/download?download_frd=1",
        },
      ],
    },
  ];

  return (
    <div
      className={
        "grid m-2 p-6 border border-gray-400 border-opacity-35 shadow-xl rounded-2xl overflow-hidden"
      }
    >
      <div className={"flex items-center justify-between"}>
        <div className={"flex gap-4"}>
          <h1 className={"text-4xl font-bold"}>{groupName} Submissions</h1>
          <button
            type={"button"}
            className={
              "bg-white rounded-xl p-1 relative top-1 hover:bg-blue-400"
            }
          >
            <img
              src="/drop-down-arrow.png"
              alt="Show/Hide Group Submissions"
              className={"h-6 cursor-pointer"}
            />
          </button>
        </div>
        <ProgressBar progress={progress} />
      </div>
      <div className={"mt-2 grid gap-2"}>
        {dummySubmissions.map((submission, index) => (
          <IndividualSubmission submission={submission} key={index} />
        ))}
      </div>
    </div>
  );
}
