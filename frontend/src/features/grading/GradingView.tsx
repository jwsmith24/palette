import { ReactElement, useEffect, useState } from "react";
import { PaletteAPIResponse, Rubric } from "palette-types";
import { useFetch } from "@hooks";
import { useCourse } from "src/context/CourseProvider";
import { useAssignment } from "../../context/AssignmentProvider.tsx";
import LoadingDots from "../../components/LoadingDots.tsx";
import NoCourseSelected from "../../components/NoCourseSelected.tsx";
import NoAssignmentSelected from "../../components/NoAssignmentSelected.tsx";
import GroupSubmissions from "@features/grading/GroupSubmissions.tsx";
import MainPageTemplate from "../../components/MainPageTemplate.tsx";
import { GroupedSubmissions } from "palette-types/dist/types/GroupedSubmissions.ts";
import AssignmentData from "@features/grading/AssignmentData.tsx";

export default function GradingView(): ReactElement {
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

  // layout control
  const [isExpandedView, setExpandedView] = useState<boolean>(false);

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
      return renderSubmissionView();
    }

    return (
      <div className={"grid h-full"}>
        {loading && <LoadingDots />}
        {!activeCourse && <NoCourseSelected />}
        {activeCourse && !activeAssignment && <NoAssignmentSelected />}
      </div>
    );
  };

  const renderSubmissionView = () => {
    if (!activeAssignment) return;
    return (
      <div>
        <div className={"flex-col gap-2"}>
          <h1 className={"text-5xl font-bold p-4"}>Submission Dashboard</h1>
          <p
            className={
              "font-bold bg-gray-800 px-3 py-1 rounded-xl w-min text-nowrap ml-4"
            }
          >
            View:{" "}
            <button
              className={"font-semibold text-blue-400"}
              type={"button"}
              onClick={() => {
                setExpandedView(!isExpandedView);
              }}
            >
              {isExpandedView ? "Expanded" : "Simple"}
            </button>
          </p>
        </div>
        <AssignmentData rubric={rubric} />
        <div
          className={
            " grid grid-flow-col-dense auto-rows-fr grid-cols-auto " +
            " gap-4 px-8 max-w-screen max-h-full m-auto justify-start"
          }
        >
          {Object.entries(submissions).map(([groupId, groupSubmissions]) => {
            // read group name from first entry
            const groupName: string =
              groupSubmissions[0]?.group?.name || "No Group";

            const calculateGradingProgress = () => {
              if (groupSubmissions.length === 0) return 0; // no submissions to grade

              const gradedSubmissionCount = groupSubmissions.reduce(
                (count, submission) => {
                  return submission.graded ? count + 1 : count;
                },
                0, // initial value for counter
              );

              return (gradedSubmissionCount / groupSubmissions.length) * 100;
            };
            return (
              <GroupSubmissions
                key={groupId}
                groupName={groupName}
                progress={calculateGradingProgress()}
                isExpanded={isExpandedView}
                submissions={groupSubmissions}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return <MainPageTemplate children={renderContent()} />;
}
