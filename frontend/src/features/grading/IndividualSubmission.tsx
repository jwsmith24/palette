import {Submission} from "palette-types";
import {useEffect, useState} from "react";

/**
 * Component for displaying student submission in the submissions view.
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
            className={`h-8 ${submissionFlag.submittedOpacity}`}
          />
          <img
            src="/close-icon.png"
            alt="Assignment Submitted"
            className={`h-8 ${submissionFlag.missingOpacity}`}
          />
          <img
            src="/timer-purple.png"
            alt="Assignment Submitted"
            className={`h-8 ${submissionFlag.lateOpacity}`}
          />
        </div>
        <div className={"flex justify-self-start"}>
          <button type={"button"}>{`Attachments: ${attachmentCount}`}</button>
        </div>
      </div>
    </div>
  );
}
