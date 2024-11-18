import {Submission} from "palette-types";
import {useEffect, useState} from "react";

/**
 * Component for displaying student submission in the group submissions view.
 */
export default function IndividualSubmission({
  submission,
}: {
  submission: Submission;
}) {
  const [submissionFlag, setSubmissionFlag] = useState({
    gradedOpacity: "opacity-10",
    missingOpacity: "opacity-10",
    lateOpacity: "opacity-25",
  });

  const [attachmentCount, setAttachmentCount] = useState(0);
  const ICON_SIZE = "h-6";

  // set the icons based on submission status: graded | missing | late
  useEffect(() => {
    if (submission.graded)
      setSubmissionFlag({ ...submissionFlag, gradedOpacity: "" });
    if (submission.missing)
      setSubmissionFlag({ ...submissionFlag, missingOpacity: "" });
    if (submission.late)
      setSubmissionFlag({ ...submissionFlag, lateOpacity: "" });
  }, [submission]);

  useEffect(() => {
    if (!submission || !submission.attachments) return;
    setAttachmentCount(submission.attachments.length);
  }, []);

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

      <div>Comments: {submission.comment ? submission.comment : "None"}</div>

      <div className={"grid gap-2"}>
        <div className={"flex gap-6"}>
          <img
            src="/check-icon.png"
            alt="Assignment Submitted"
            className={`${ICON_SIZE} ${submissionFlag.gradedOpacity}`}
          />
          <img
            src="/close-icon.png"
            alt="Assignment Submitted"
            className={`${ICON_SIZE} ${submissionFlag.missingOpacity}`}
          />
          <img
            src="/timer-purple.png"
            alt="Assignment Submitted"
            className={`${ICON_SIZE} ${submissionFlag.lateOpacity}`}
          />
        </div>
        <div className={"flex justify-self-start"}>
          <button type={"button"}>{`Attachments: ${attachmentCount}`}</button>
        </div>
      </div>
    </div>
  );
}
