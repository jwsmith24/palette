import {Submission} from "palette-types";

/**
 * Component for displaying student submission in the submissions view.
 */
export default function IndividualSubmission({
  submission,
}: {
  submission: Submission;
}) {
  return <div className={"border border-pink-400"}>{submission.user.name}</div>;
}
