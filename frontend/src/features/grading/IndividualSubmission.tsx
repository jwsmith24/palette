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

  // set the icons based on submission status: graded | missing | late | comments
  useEffect(() => {
    setIconStatus((prev) => ({
      ...prev,
      gradedOpacity: submission.graded ? "" : "opacity-20",
      missingOpacity: submission.missing ? "" : "opacity-20",
      lateOpacity: submission.late ? "" : "opacity-30",
      commentOpacity: submission.comment ? "" : "opacity-20",
    }));
  }, [submission]);

  useEffect(() => {
    if (!submission || !submission.attachments) return;
    setAttachmentCount(submission.attachments.length);
  }, [submission]);

  return (
    <div
      className={
        "border border-pink-400 px-4 py-3 rounded-full flex gap-6 justify-between items-center cursor-pointer "
      }
    >
      <div className={"flex items-center gap-4 text-xl font-semibold"}>
        <p>{submission.user.asurite}</p>
        <p className={"font-light"}>{submission.user.name}</p>
      </div>

      <div className={"grid gap-2 items-center"}>
        <div className={"flex gap-6 bg-gray-900 py-1 px-2 rounded-2xl"}>
          <img
            src="/check-icon.png"
            alt="Assignment Graded"
            className={`${ICON_SIZE} ${iconStatus.gradedOpacity}`}
          />
          <img
            src="/close-icon.png"
            alt="Assignment Submission Missing"
            className={`${ICON_SIZE} ${iconStatus.missingOpacity}`}
          />
          <img
            src="/timer-purple.png"
            alt="Assignment Submitted Late"
            className={`${ICON_SIZE} ${iconStatus.lateOpacity}`}
          />
          <img
            src="/comment-icon.png"
            alt="Comments Added"
            className={`${ICON_SIZE} ${iconStatus.commentOpacity}`}
          />
        </div>
        <div className={"flex justify-self-center"}>
          <button type={"button"}>{`Attachments: ${attachmentCount}`}</button>
        </div>
      </div>
    </div>
  );
}
