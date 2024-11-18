import { ReactElement, useEffect, useState } from "react";
import { Footer, Header } from "@components";
import { PaletteAPIResponse, Rubric } from "palette-types";
import { useFetch } from "@hooks";
import { useCourse } from "src/context/CourseProvider";
import { useAssignment } from "../../context/AssignmentProvider.tsx";
import { useNavigate } from "react-router-dom";
import LoadingDots from "../../components/LoadingDots.tsx";
import NoCourseSelected from "../../components/NoCourseSelected.tsx";
import NoAssignmentSelected from "../../components/NoAssignmentSelected.tsx";

export default function GradingView(): ReactElement {
  const [rubric, setRubric] = useState<Rubric>();
  const [loading, setLoading] = useState(false);

  const { activeCourse } = useCourse();
  const { activeAssignment } = useAssignment();
  const navigate = useNavigate();

  //todo: get assignment and then get rubric
  /**
   * Get the rubric id for the active assignment.
   *
   * The active Assignment is already stored in context.
   */
  const { fetchData: getRubric } = useFetch(
    `/courses/${activeCourse?.id}/rubrics/${activeAssignment?.rubricId}`,
  );

  const resetState = () => {
    // reset rubric state for clean slate prior to fetch
    setRubric(undefined);
  };

  useEffect(() => {
    // prevent effect if either course or assignment is not selected
    if (!activeCourse || !activeAssignment) {
      return;
    }
    resetState();
    setLoading(true);
    void fetchRubric();
  }, [activeCourse, activeAssignment]);

  const fetchRubric = async () => {
    try {
      const response = (await getRubric()) as PaletteAPIResponse<Rubric>;
      console.log(response);

      if (response.success) {
        setRubric(response.data);
      }
    } catch (error) {
      console.error("An unexpected error occurred while getting rubric", error);
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
        <div className={"grid p-4 border-red-500 border mt-4"}>
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
        {renderSubmissions()}
      </div>
    );
  };

  const dummySubmissions = [
    "submission 1",
    "submission 2",
    "submission 3",
    "submission 4",
    "submission 5",
  ];

  const renderSubmissions = () => {
    return (
      <div className={"grid my-2 p-12 border border-blue-500"}>
        <h1 className={"text-4xl font-bold"}>Submissions</h1>
        <h2>100% Graded</h2>
        <div className={"border border-purple-400 mt-2"}>
          {dummySubmissions.map((submission, index) => (
            <div key={index} className={"text-2xl"}>
              {submission}{" "}
            </div>
          ))}
        </div>
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
