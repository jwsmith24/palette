import { Submission } from "palette-types";
import { useEffect, useState } from "react";

type SubmissionIconStatus = {
  gradedOpacity: string;
  missingOpacity: string;
  lateOpacity: string;
  commentOpacity: string;
};

/**
 * Component for displaying student submission in the group submissions view.
 */
export default function IndividualSubmission({
  submission,
}: {
  submission: Submission;
}) {
  // initialize status icons to ghosted. Late icon needed a little bump for visibility.
  const [iconStatus, setIconStatus] = useState<SubmissionIconStatus>({
    gradedOpacity: "opacity-20",
    missingOpacity: "opacity-20",
    lateOpacity: "opacity-30",
    commentOpacity: "opacity-20",
  });

  const [attachmentCount, setAttachmentCount] = useState<number>(0);
  const ICON_SIZE = "h-6";
  const MAX_ID_LENGTH = 10;

  // set the icons based on submission status: graded | missing | late | comments
  useEffect(() => {
    setIconStatus((prev) => ({
      ...prev,
      gradedOpacity: submission.graded ? "" : "opacity-20",
      missingOpacity: submission.missing ? "" : "opacity-20",
      lateOpacity: submission.late ? "" : "opacity-30",
      commentOpacity: submission.comments ? "" : "opacity-20",
    }));
  }, [submission]);

  useEffect(() => {
    if (!submission || !submission.attachments) return;
    setAttachmentCount(submission.attachments.length);
  }, [submission]);

  return (
    <div
      className={
        "border border-gray-200 border-opacity-50 px-4 py-3 rounded-xl flex gap-6 justify-between items-center" +
        " cursor-pointer hover:border-opacity-100 shadow-2xl"
      }
    >
      <div className={"flex items-center gap-4 text-xl font-semibold"}>
        <p>
          {submission.user.asurite.length > MAX_ID_LENGTH
            ? submission.user.asurite.slice(0, MAX_ID_LENGTH) + "..."
            : submission.user.asurite}
        </p>
        <p className={"font-light"}>{submission.user.name}</p>
      </div>

      <div className={"grid gap-2 items-center"}>
        <div className={"flex gap-6 bg-gray-900 p-2 rounded-2xl"}>
          <img
            src="/check-icon.png"
            alt="Assignment Graded"
            className={`${ICON_SIZE} ${iconStatus.gradedOpacity}`}
            title="Assignment Graded"
          />

          <img
            src="/timer-purple.png"
            alt="Assignment Submitted Late"
            className={`${ICON_SIZE} ${iconStatus.lateOpacity}`}
            title="Late"
          />
          <img
            src="/comment-icon.png"
            alt="Comments Added"
            className={`${ICON_SIZE} ${iconStatus.commentOpacity}`}
            title="Comments"
          />
          <img
            src="/close-icon.png"
            alt="Assignment Submission Missing"
            className={`${ICON_SIZE} ${iconStatus.missingOpacity}`}
            title="Missing"
          />
        </div>
        <div className={"flex justify-self-center"}>
          <button type={"button"}>{`Attachments: ${attachmentCount}`}</button>
        </div>
      </div>
    </div>
  );
}
