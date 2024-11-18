import {useFetch} from "@hooks";
import {useEffect, useState} from "react";
import {Submission} from "palette-types";

/**
 * Component for displaying student submission in the submissions view.
 */
export default function IndividualSubmissions() {
  // fetch submissions

  const fetchSubmissionsURL =
    "https://canvas.asu.edu/api/v1/courses/15760/assignments/5739158/submissions?grouped=true&include=group&include=user";

  //todo: !! this component should just be about rendering and not actually doing the fetching !!

  const { fetchData: getSubmissions, response: getSubmissionsResponse } =
    useFetch(fetchSubmissionsURL);

  const [submissions, setSubmissions] = useState<Submission[]>([]);

  /**
   * Fetch submissions on mount.
   */
  useEffect(() => {
    void fetchSubmissions();
  }, []);

  const fetchSubmissions = async () => {
    const canvasResponse = await getSubmissions();
    if (canvasResponse) {
      setSubmissions(getSubmissionsResponse.data as Submission[]);
    }
  };

  return (
    <div>
      {submissions.map((submission) => {
        return <p>{submission.user.name}</p>;
      })}
    </div>
  );
}
