import { ReactElement, useEffect, useState } from "react";
import { PaletteAPIResponse, Rubric } from "palette-types";
import { useFetch } from "@hooks";
import { useCourse } from "src/context/CourseProvider";
import { useAssignment } from "../../context/AssignmentProvider.tsx";
import LoadingDots from "../../components/LoadingDots.tsx";
import NoCourseSelected from "../../components/NoCourseSelected.tsx";
import NoAssignmentSelected from "../../components/NoAssignmentSelected.tsx";
import MainPageTemplate from "../../components/MainPageTemplate.tsx";
import { GroupedSubmissions } from "palette-types/dist/types/GroupedSubmissions.ts";
import SubmissionsDashboard from "@features/grading/SubmissionsDashboard.tsx";

export default function GradingMain(): ReactElement {
  // state
  const [rubric, setRubric] = useState<Rubric>();
  const [submissions, setSubmissions] = useState<GroupedSubmissions>({
    "no-group": [],
  });
  const [loading, setLoading] = useState<boolean>(false);

  // context providers
  const { activeCourse } = useCourse();
  const { activeAssignment } = useAssignment();

  // url string constants
  const fetchSubmissionsURL = `/courses/${activeCourse?.id}/assignments/${activeAssignment?.id}/submissions`;
  const getRubricURL = `/courses/${activeCourse?.id}/rubrics/${activeAssignment?.rubricId}`;

  // define fetch hooks
  const { fetchData: getRubric } = useFetch(getRubricURL);
  const { fetchData: getSubmissions } = useFetch(fetchSubmissionsURL);

  /**
   * Clear state prior to fetch operations.
   */
  const resetState = () => {
    setRubric(undefined);
    setSubmissions({ "no-group": [] });
  };

  // fetch rubric and submissions when course or assignment change
  useEffect(() => {
    if (!activeCourse || !activeAssignment) {
      // prevent effect if either course or assignment is not selected
      return;
    }

    resetState();
    setLoading(true);
    void fetchRubric();
    void fetchSubmissions();
  }, [activeCourse, activeAssignment]);

  const fetchRubric = async () => {
    if (!activeAssignment?.rubricId) return; // avoid fetch if assignment doesn't have an associated rubric
    try {
      const response = (await getRubric()) as PaletteAPIResponse<Rubric>;

      if (response.success) {
        setRubric(response.data);
      }
    } catch (error) {
      console.error("An error occurred while getting rubric: ", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response =
        (await getSubmissions()) as PaletteAPIResponse<GroupedSubmissions>;

      if (response.success && response.data) {
        setSubmissions(response.data);
      }
    } catch (error) {
      console.error("An error occurred while getting submissions: ", error);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    if (!loading && activeCourse && activeAssignment) {
      return <SubmissionsDashboard submissions={submissions} rubric={rubric} />;
    }

    return (
      <div className={"grid h-full"}>
        {loading && <LoadingDots />}
        {!activeCourse && <NoCourseSelected />}
        {activeCourse && !activeAssignment && <NoAssignmentSelected />}
      </div>
    );
  };

  return <MainPageTemplate children={renderContent()} />;
}
