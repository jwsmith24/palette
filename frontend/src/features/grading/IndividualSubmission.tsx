import { useFetch } from "@hooks";
import { useState } from "react";

export default function IndividualSubmissions() {
  // fetch submissions

  const fetchSubmissionsURL =
    "https://canvas.asu.edu/api/v1/courses/15760/assignments/5739158/submissions?grouped=true&include=group&include=user";

  const { fetchData: getSubmissions } = useFetch(fetchSubmissionsURL);

  const [submissions, setSubmissions] = useState([]);

  const fetchSubmissions = async () => {
    const canvasResponse = await getSubmissions();
  };

  return <div></div>;
}
