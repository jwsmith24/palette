import { ReactElement, useEffect, useState } from "react";
import { Footer, Header } from "@components";
import { PaletteAPIResponse, Rubric, Submission } from "palette-types";
import { useFetch } from "@hooks";
import { useCourse } from "src/context/CourseProvider";
import { useAssignment } from "../../context/AssignmentProvider.tsx";
import { useNavigate } from "react-router-dom";
import LoadingDots from "../../components/LoadingDots.tsx";
import NoCourseSelected from "../../components/NoCourseSelected.tsx";
import NoAssignmentSelected from "../../components/NoAssignmentSelected.tsx";
import GroupSubmissions from "@features/grading/GroupSubmissions.tsx";

export default function GradingView(): ReactElement {
  // state
  const [rubric, setRubric] = useState<Rubric>();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(false);

  // context providers
  const { activeCourse } = useCourse();
  const { activeAssignment } = useAssignment();
  const navigate = useNavigate();

  // url string constants
  const fetchSubmissionsURL = `https://canvas.asu.edu/api/v1/courses/${activeCourse?.id}/assignments/${activeAssignment?.rubricId}/submissions?grouped=true&include=group&include=user`;
  const getRubricURL = `/courses/${activeCourse?.id}/rubrics/${activeAssignment?.rubricId}`;

  // define fetch hooks
  const { fetchData: getRubric } = useFetch(getRubricURL);
  const { fetchData: getSubmissions } = useFetch(fetchSubmissionsURL);

  /**
   * Clear state prior to fetch operations.
   */
  const resetState = () => {
    setRubric(undefined);
    setSubmissions([]);
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
    try {
      const response = (await getRubric()) as PaletteAPIResponse<Rubric>;
      console.log(response);

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
      const response = (await getSubmissions()) as PaletteAPIResponse<
        Submission[]
      >;
      console.log(response);

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
    if (loading) return <LoadingDots />;
    if (!activeCourse) return <NoCourseSelected />;
    if (!activeAssignment) return <NoAssignmentSelected />;

    return renderSubmissionView();
  };

  const renderSubmissionView = () => {
    return (
      <div>
        {/*Assignment and Rubric Info*/}
        <div className={"grid p-4 mt-4"}>
          <p>
            Assignment {activeAssignment?.id}: {activeAssignment?.name}
          </p>
          <p>
            Rubric:{" "}
            {rubric ? (
              rubric.title
            ) : (
              <span>
                {" "}
                This assignment does not have an associated rubric. Click{" "}
                <button
                  className={"text-red-400"}
                  type={"button"}
                  onClick={() => navigate("/rubric-builder")}
                >
                  here
                </button>{" "}
                to make one!
              </span>
            )}
          </p>
        </div>
        <GroupSubmissions />
      </div>
    );
  };

  return (
    <div className="h-screen w-screen grid grid-cols-1 grid-rows-[0.2fr_5fr_0.2fr] bg-gradient-to-b from-gray-900 to-gray-700 text-white font-sans ">
      <Header />
      {renderContent()}
      <Footer />
    </div>
  );
}
