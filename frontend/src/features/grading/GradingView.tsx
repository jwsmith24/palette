import { ReactElement, useEffect, useState } from "react";
import { Footer, Header } from "@components";
import { PaletteAPIResponse, Rubric } from "palette-types";
import { useFetch } from "@hooks";
import { useCourse } from "src/context/CourseProvider";
import NoCourseSelected from "@features/rubricBuilder/NoCourseSelected.tsx";
import NoAssignmentSelected from "@features/rubricBuilder/NoAssignmentSelected.tsx";
import { useAssignment } from "../../context/AssignmentProvider.tsx";
import { useNavigate } from "react-router-dom";

export default function GradingView(): ReactElement {
  const [rubric, setRubric] = useState<Rubric>();
  const [rubricErrorMessage, setRubricErrorMessage] = useState<ReactElement>();
  const [loading, setLoading] = useState(false);

  const { activeCourse } = useCourse();
  const { activeAssignment } = useAssignment();

  //todo: get assignment and then get rubric
  /**
   * Get the rubric id for the active assignment.
   *
   * The active Assignment is already stored in context.
   */
  const { fetchData: getRubric } = useFetch(
    `/courses/${activeCourse?.id}/rubrics/${activeAssignment?.rubricId}`
  );

  const resetState = () => {
    // reset rubric state for clean slate prior to fetch
    setRubric(undefined);
    setRubricErrorMessage(undefined);
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

  const navigate = useNavigate();

  const fetchRubric = async () => {
    try {
      const response = (await getRubric()) as PaletteAPIResponse<Rubric>;
      console.log(response);

      if (response.success) {
        setRubric(response.data);
      } else {
        setRubricErrorMessage(
          <div className={"grid gap-8"}>
            <p>This course does not have an associated rubric.</p>
            <p>
              You can make one in the{" "}
              <button
                className={"text-purple-500 hover:animate-pulse"}
                type={"button"}
                onClick={() => navigate("/rubric-builder")}
              >
                Builder
              </button>{" "}
              tab!
            </p>
          </div>
        );
      }
    } catch (error) {
      console.error("An unexpected error occurred while getting rubric", error);
      setRubricErrorMessage(<p>An unexpected error occurred.</p>);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="h-screen w-screen grid grid-cols-1 grid-rows-[0.2fr_5fr_0.2fr] bg-gradient-to-b from-gray-900 to-gray-700 text-white font-sans">
      <Header />

      <div className={"flex content-center place-self-center"}>
        {!activeCourse ? (
          <NoCourseSelected />
        ) : !activeAssignment ? (
          <NoAssignmentSelected />
        ) : (
          <div className="grid h-full w-full gap-10 place-items-center">
            {/* Content Section */}
            <div className=" text-center font-bold text-5xl grid gap-6 items-center">
              <p>
                {loading
                  ? "Loading..."
                  : (rubric && rubric.title) || rubricErrorMessage}
              </p>
              <p className={"font-medium text-2xl"}>
                {rubric ? `Points Possible: ${rubric.pointsPossible}` : " "}
              </p>
              <p className={"font-medium text-2xl"}>
                {rubric?.criteria.map((criterion) => {
                  return (
                    <div className={"border-2 border-white p-2"}>
                      <p>{criterion.description}</p>
                      <p>Max Points: {criterion.points}</p>
                    </div>
                  );
                })}
              </p>
            </div>
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
