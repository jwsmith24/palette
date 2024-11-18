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
    submittedOpacity: "",
    missingOpacity: "",
    lateOpacity: "",
  });

  const [attachmentCount, setAttachmentCount] = useState(0);
  const ICON_SIZE = "h-6";

  useEffect(() => {
    if (submission.submitted)
      setSubmissionFlag({ ...submissionFlag, submittedOpacity: "opacity-10" });
    if (submission.missing)
      setSubmissionFlag({ ...submissionFlag, missingOpacity: "opacity-10" });
    if (submission.late)
      setSubmissionFlag({ ...submissionFlag, lateOpacity: "opacity-10" });
  }, [submission]);

  useEffect(() => {
    if (!submission) return;
    setAttachmentCount(submission.attachments.length);
  }, []);

  return (
    <div
      className={
        "border border-pink-400 px-4 py-3 rounded-full flex gap-6 justify-between items-center"
      }
    >
      <div className={"flex items-center gap-4 text-xl font-semibold"}>
        <p>{submission.user.asurite}</p>
        <p className={"font-light"}>{submission.user.name}</p>
      </div>

      <div className={"grid gap-2"}>
        <div className={"flex gap-6"}>
          <img
            src="/check-icon.png"
            alt="Assignment Submitted"
            className={`${ICON_SIZE} ${submissionFlag.submittedOpacity}`}
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
