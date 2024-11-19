import { ReactElement, useEffect, useState } from "react";
import { PaletteAPIResponse, Rubric, Submission } from "palette-types";
import { useFetch } from "@hooks";
import { useCourse } from "src/context/CourseProvider";
import { useAssignment } from "../../context/AssignmentProvider.tsx";
import { useNavigate } from "react-router-dom";
import LoadingDots from "../../components/LoadingDots.tsx";
import NoCourseSelected from "../../components/NoCourseSelected.tsx";
import NoAssignmentSelected from "../../components/NoAssignmentSelected.tsx";
import GroupSubmissions from "@features/grading/GroupSubmissions.tsx";
import MainPageTemplate from "../../components/MainPageTemplate.tsx";

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

  // layout control
  const [isExpandedView, setExpandedView] = useState<boolean>(false);

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

  const dummyGroups = [
    "Galaxy Explorers",
    "Nebula Navigators",
    "Comet Chasers",
    "Stellar Pioneers",
    "Asteroid Adventurers",
    "Cosmic Voyagers",
    "Lunar Legends",
    "Orbit Operators",
    "Supernova Squad",
    "Solar Seekers",
    "Planet Patrol",
    "Starbase Strikers",
    "Meteor Mavericks",
    "Black Hole Bandits",
    "Rocket Rangers",
    "Astral Alliance",
  ];

  const renderSubmissionView = () => {
    if (!activeAssignment) return;
    return (
      <div>
        {/*Assignment and Rubric Info*/}
        <div className={"flex px-4 justify-between items-center"}>
          <div className={"grid gap-2 p-4 mt-4 "}>
            <p className={"font-bold text-3xl"}>{activeAssignment.name}</p>
            <p>
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
          <p className={"mr-32 font-bold bg-gray-800 px-3 py-1 rounded-xl"}>
            View:{" "}
            <button
              className={"font-semibold text-blue-400"}
              type={"button"}
              onClick={() => {
                setExpandedView(!isExpandedView);
              }}
            >
              {isExpandedView ? "Detailed" : "Condensed"}
            </button>
          </p>
        </div>

        <div
          className={
            " grid grid-flow-row auto-rows-fr grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" +
            " gap-4 px-8 max-w-screen max-h-full m-auto"
          }
        >
          {dummyGroups.map((dummyGroup) => {
            return (
              <GroupSubmissions
                groupName={dummyGroup}
                progress={Math.floor(Math.random() * 100)}
                isExpanded={isExpandedView}
              />
            );
          })}
        </div>
      </div>
    );
  };

  return <MainPageTemplate children={renderContent()} />;
}
