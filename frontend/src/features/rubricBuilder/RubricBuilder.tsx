/**
 * Rubric Builder view.
 */

import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import CriteriaInput from "./CriteriaInput";
import { Dialog, Footer, Header, ModalChoiceDialog } from "@components";
import CSVUpload from "./CSVUpload";

import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import { useFetch } from "@hooks";
import { CSVRow } from "@local_types";

import { createCriterion, createRating, createRubric } from "@utils";

import { Criteria, Rubric } from "palette-types";
import CSVExport from "@features/rubricBuilder/CSVExport";
import { AnimatePresence, motion } from "framer-motion";
import { useCourse } from "../../context";
import NoCourseSelected from "@features/rubricBuilder/NoCourseSelected.tsx";
import { useAssignment } from "../../context/AssignmentProvider.tsx";
import NoAssignmentSelected from "@features/rubricBuilder/NoAssignmentSelected.tsx";
import LoadingDots from "../../components/LoadingDots.tsx";

export default function RubricBuilder(): ReactElement {
  /**
   * Rubric Builder State
   */
  const [rubric, setRubric] = useState<Rubric | undefined>(undefined);
  const [fileInputActive, setFileInputActive] = useState(false); // file input display is open or not
  const [activeCriterionIndex, setActiveCriterionIndex] = useState(-1);

  const [existingRubric, setExistingRubric] = useState(false);
  const [isUpdatedRubric, setIsUpdatedRubric] = useState(false);

  const [loading, setLoading] = useState(false);

  const hasMounted = useRef(false);

  /**
   * Group modal state in one object.
   */

  const closeModal = () => setModal({ ...modal, isOpen: false });

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    choices: [{ label: "OK", action: closeModal }],
  });

  /**
   * Active Course and Assignment State
   */
  const { activeCourse } = useCourse();
  const { activeAssignment } = useAssignment();

  /**
   * Custom fetch hooks provide a `fetchData` callback to send any type of fetch request.
   *
   * See PaletteAPIRequest for options structure.
   */

  /**
   * POST fetch hook to add a new rubric to Canvas.
   */
  const { response: postRubricResponse, fetchData: postRubric } = useFetch(
    "/courses/15760/rubrics", // hardcoded course ID for now
    {
      method: "POST",
      body: JSON.stringify(rubric), // use latest rubric data
    },
  );

  /**
   * PUT fetch hook to update an existing rubric on Canvas.
   */
  const { response: putRubricResponse, fetchData: putRubric } = useFetch(
    `/courses/${activeCourse?.id}/rubrics/${rubric?.id}`,
    {
      method: "PUT",
      body: JSON.stringify(rubric),
    },
  );

  /**
   * GET rubric from the active assignment.
   */
  const { fetchData: getRubric } = useFetch(
    `/courses/${activeCourse?.id}/rubrics/${activeAssignment?.rubricId}`,
  );

  /**
   * Effect hook to see if the active assignment has an existing rubric. Apply loading status while waiting to
   * determine which view to render.
   */
  useEffect(() => {
    if (!activeCourse || !activeAssignment) return;
    setLoading(true);
    const checkRubricExists = async () => {
      const response = await getRubric();
      if (!response) {
        setLoading(false);
        return;
      }
      setExistingRubric(response.success || false);
      setRubric(response.data as Rubric);
      setLoading(false);
    };
    void checkRubricExists();
  }, [activeCourse, activeAssignment]);

  /**
   * Helper function for the effect hook that handles the modal display based on the response.
   */
  const handlePostRubricResponse = () => {
    if (postRubricResponse.success) {
      setModal({
        isOpen: true,
        title: "Success",
        message: `Rubric "${rubric?.title}" submitted successfully!`,
        choices: [{ label: "OK", action: closeModal }],
      });
    } else {
      const errorMessage =
        postRubricResponse.error || "An unexpected error occurred";

      setModal({
        isOpen: true,
        title: "Error",
        message: errorMessage,
        choices: [{ label: "OK", action: closeModal }],
      });
    }
  };

  /**
   * Effect hook to process the response when it comes back.
   */
  useEffect(() => {
    if (!postRubricResponse || postRubricResponse.loading) return;
    handlePostRubricResponse();
  }, [postRubricResponse]);

  /**
   * Rubric change event handlers
   */

  /**
   * Display modal feedback when put response changes.
   */
  useEffect(() => {
    // avoid rendering modal on initial mount
    if (!hasMounted.current) {
      hasMounted.current = true;
      return;
    }

    if (!rubric || !putRubricResponse) return;

    setModal({
      isOpen: true,
      title: putRubricResponse.success ? "Success!" : "Error",
      message: putRubricResponse.success
        ? "Rubric was overwritten!"
        : `Error overwriting the rubric: ${putRubricResponse.error}`,
      choices: [{ label: "OK", action: closeModal }],
    });
  }, [putRubricResponse]);

  /**
   * If user selects edit existing rubric, the program loads the rubric. When the user clicks "Save Rubric" the
   * program sends a PUT request to apply updates.
   */
  const editRubric = () => {
    closeModal();
    setIsUpdatedRubric(true); // set flag so that we update
  };

  /**
   * If user selects replace existing rubric, the program creates a new rubric for the user to edit.
   *
   * On "Save Rubric", the program sends a POST request to add the new rubric to the associated assignment on Canvas..
   */
  const replaceRubric = () => {
    closeModal();
    setIsUpdatedRubric(false);
    const newRubric = createRubric();
    setRubric(newRubric); // set the active rubric to a fresh rubric
  };

  /**
   * Fires when a selected assignment already has a rubric.
   *
   * User has the option to either overwrite the rubric with a fresh start or edit the existing rubric.
   */
  const handleExistingRubric = () => {
    if (!rubric) return;

    setModal({
      isOpen: true,
      title: "Existing Rubric Detected",
      message: `A rubric with the title "${rubric.title}" already exists for the active assignment. How would you like to proceed?`,
      choices: [
        { label: "Edit Rubric", action: () => void editRubric() },
        { label: "Create New Rubric", action: () => void replaceRubric() },
      ],
    });
  };

  const handleSubmitRubric = async (event: MouseEvent): Promise<void> => {
    event.preventDefault();
    if (!rubric || !activeCourse) return;

    try {
      if (isUpdatedRubric) {
        console.log(`Updating rubric: ${rubric.title} in ${activeCourse.id}`);
        await putRubric();
      } else {
        console.log(`Adding new Rubric to ${activeCourse.id}: ${rubric.title}`);
        await postRubric();
      }
    } catch (error) {
      console.error("Error handling rubric submission:", error);
    }
  };

  const handleRubricTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setRubric((prevRubric) =>
      prevRubric
        ? { ...prevRubric, title: event.target.value }
        : createRubric(),
    );
  };

  /**
   * Generates a set of the current criteria descriptions stored within the component state to use for checking
   * duplicate entries.
   */
  const buildCriteriaDescriptionSet = (clearedRubric: Rubric): Set<string> =>
    new Set(
      clearedRubric.criteria.map((criterion) =>
        criterion.description.trim().toLowerCase(),
      ),
    );

  /**
   * Calculate rubric max points whenever rubric criterion changes. Uses memoization to avoid re-rendering the
   * function everytime, improving performance.
   *
   * Defaults to 0 if no criterion is defined.
   */
  const maxPoints = useMemo(() => {
    if (!rubric) return;

    return (
      rubric.criteria.reduce(
        (sum, criterion) =>
          isNaN(criterion.points) ? sum : sum + criterion.points,
        0, // init sum to 0
      ) ?? 0 // fallback value if criterion is undefined
    );
  }, [rubric?.criteria]);

  // update rubric state with new list of criteria
  const handleAddCriteria = (event: MouseEvent) => {
    event.preventDefault();
    if (!rubric) return;

    const newCriteria = [...rubric.criteria];
    setRubric({ ...rubric, criteria: newCriteria });
    setActiveCriterionIndex(newCriteria.length - 1);
  };

  const handleRemoveCriterion = (index: number) => {
    if (!rubric) return;
    const newCriteria = [...rubric.criteria];
    newCriteria.splice(index, 1); // remove the target criterion from the array
    setRubric({ ...rubric, criteria: newCriteria });
  };

  // update criterion at given index
  const handleUpdateCriterion = (index: number, criterion: Criteria) => {
    if (!rubric) return;
    const newCriteria = [...rubric.criteria];
    newCriteria[index] = criterion; // update the criterion with changes;
    setRubric({ ...rubric, criteria: newCriteria }); // update rubric to have new criteria
  };

  /**
   * CSV Import and Export Functionality
   * @param data - parsed csv data
   */

  // Update state with the new CSV/XLSX data
  const handleImportFile = (data: CSVRow[]) => {
    // reset the rubric state to clear any existing criteria
    const clearedRubric = { ...rubric, criteria: [] as Criteria[] };
    setRubric(clearedRubric as Rubric);

    // create a set of current criteria descriptions to optimize duplicate check
    const existingCriteriaDescriptions = buildCriteriaDescriptionSet(
      clearedRubric as Rubric,
    );

    // Skip the first row (header row)
    const dataWithoutHeader = data.slice(1);

    // data is a 2D array representing the CSV
    const newCriteria = dataWithoutHeader
      .map((row: CSVRow) => {
        // ensures title is a string and non-empty otherwise throw out the entry
        if (typeof row[0] !== "string" || !row[0].trim()) {
          console.warn(
            `Non-string or empty value in criterion description field: ${row[0]}. Throwing out entry.`,
          );
          return null;
        }

        const criteriaDescription = row[0].trim().toLowerCase();
        // check for duplicates
        if (existingCriteriaDescriptions.has(criteriaDescription)) {
          console.warn(
            `Duplicate criterion found: ${criteriaDescription}. Throwing out entry.`,
          );
          return null; //skip adding the duplicate criterion
        }

        // Create new criterion if unique
        const criterion: Criteria = createCriterion(row[0], "", 0, []);

        // process ratings in their column pairs
        let i = 1;
        let j = 2;
        // while not at the end of the row and not looking at empty cells
        while (i < row.length && !(row[i] === "" && row[j] === "")) {
          const points = Number(row[i] as number); // Ratings (B, D, F, etc.)
          const description = row[j] as string; // add type assertions

          // If points and description are valid, create a new Rating and add it to the ratings array
          const rating = createRating(points, description);
          criterion.ratings.push(rating);

          i += 2;
          j += 2;
        }
        criterion.updatePoints();
        return criterion;
      })
      .filter((criterion) => criterion !== null); // remove null values (bad entries)

    // update rubric state
    setRubric(
      (prevRubric) =>
        ({
          ...prevRubric,
          criteria: [...(prevRubric?.criteria || []), ...newCriteria],
        }) as Rubric,
    );
  };

  const handleImportFilePress = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!fileInputActive) {
      setFileInputActive(true);
    }
  };

  /**
   * Fires when a drag event ends, resorting the rubric criteria.
   * @param event - drag end event
   */
  const handleDragEnd = (event: DragEndEvent) => {
    if (!rubric) return;
    if (event.over) {
      const oldIndex = rubric.criteria.findIndex(
        (criterion) => criterion.key === event.active.id,
      );
      const newIndex = rubric.criteria.findIndex(
        (criterion) => criterion.key === event.over!.id, // assert not null for type safety
      );

      const updatedCriteria = [...rubric.criteria];
      const [movedCriterion] = updatedCriteria.splice(oldIndex, 1);
      updatedCriteria.splice(newIndex, 0, movedCriterion);

      setRubric({ ...rubric, criteria: updatedCriteria });
    }
  };

  /**
   * Render a card for each criterion in the active rubric.
   *
   * The Sortable Context wrapper allows the drag and drop to dynamically apply sorting. The Animate Presence wrapper
   * with the motion.div enable the transitions in and out.
   */
  const renderCriteriaCards = () => {
    if (!rubric) return;
    return (
      <SortableContext
        items={rubric.criteria.map((criterion) => criterion.key)}
        strategy={verticalListSortingStrategy}
      >
        <AnimatePresence>
          {rubric.criteria.map((criterion, index) => (
            <motion.div
              key={criterion.key}
              initial={{ opacity: 0, y: 50 }} // Starting state (entry animation)
              animate={{ opacity: 1, y: 0 }} // Animate to this state when in the DOM
              exit={{ opacity: 0, x: 50 }} // Ending state (exit animation)
              transition={{ duration: 0.3 }} // Controls the duration of the animations
              className="my-1"
            >
              <CriteriaInput
                index={index}
                activeCriterionIndex={activeCriterionIndex}
                criterion={criterion}
                handleCriteriaUpdate={handleUpdateCriterion}
                removeCriterion={handleRemoveCriterion}
                setActiveCriterionIndex={setActiveCriterionIndex}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </SortableContext>
    );
  };

  /**
   * Helper function to wrap the builder JSX.
   */
  const renderRubricBuilderForm = () => {
    if (!rubric) return;
    return (
      <form className="h-full self-center grid p-10 w-full max-w-3xl my-6 gap-6 bg-gray-800 shadow-lg rounded-lg">
        <h1 className="font-extrabold text-5xl mb-2 text-center">
          Create a new rubric
        </h1>
        <div className="flex justify-between items-center">
          <div className="flex gap-2">
            <button
              className="transition-all ease-in-out duration-300 bg-violet-600 text-white font-bold rounded-lg py-2 px-4 hover:bg-violet-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-violet-500"
              onClick={handleImportFilePress}
            >
              Import CSV
            </button>

            <CSVExport rubric={rubric} />
          </div>

          <h2 className="text-2xl font-extrabold bg-green-600 text-black py-2 px-4 rounded-lg">
            {maxPoints} {maxPoints === 1 ? "Point" : "Points"}
          </h2>
        </div>

        <input
          type="text"
          placeholder="Rubric title"
          className="rounded p-3 mb-4 hover:bg-gray-200 focus:bg-gray-300 focus:ring-2 focus:ring-blue-500 focus:outline-none text-gray-800 w-full max-w-full text-xl truncate whitespace-nowrap"
          name="rubricTitle"
          id="rubricTitle"
          value={rubric.title}
          onChange={handleRubricTitleChange}
        />

        <div className="mt-6 flex flex-col gap-3 h-[35vh] max-h-[50vh] overflow-y-auto overflow-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
          {renderCriteriaCards()}
        </div>

        <div className="grid gap-4 mt-6">
          <button
            className="transition-all ease-in-out duration-300 bg-blue-600 text-white font-bold rounded-lg py-2 px-4
                     hover:bg-blue-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onClick={handleAddCriteria}
          >
            Add Criteria
          </button>
          <button
            className="transition-all ease-in-out duration-300 bg-green-600 text-white font-bold rounded-lg py-2 px-4
                     hover:bg-green-700 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500"
            onClick={(event: MouseEvent) => {
              void handleSubmitRubric(event);
            }}
            // instead of
            // promise
          >
            Save Rubric
          </button>
        </div>
      </form>
    );
  };

  useEffect(() => {
    if (existingRubric) handleExistingRubric();
  }, [existingRubric]);

  /**
   * Helper function to consolidate conditional rendering in the JSX.
   */
  const renderContent = () => {
    if (loading) return <LoadingDots />;
    if (!activeCourse) return <NoCourseSelected />;
    if (!activeAssignment) return <NoAssignmentSelected />;
    if (!existingRubric) return null;
    return renderRubricBuilderForm();
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen justify-between flex flex-col w-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white font-sans">
        {/* Sticky Header with Gradient */}
        <Header />
        {renderContent()}

        {/* ModalChoiceDialog */}
        <ModalChoiceDialog
          show={modal.isOpen}
          onHide={closeModal}
          title={modal.title}
          message={modal.message}
          choices={modal.choices}
        />

        {/* CSV/XLSX Import Dialog */}
        <Dialog
          isOpen={fileInputActive}
          onClose={() => setFileInputActive(false)}
          title={"Import a CSV Template"}
        >
          <CSVUpload
            onDataChange={(data: CSVRow[]) => handleImportFile(data)}
            closeImportCard={() => setFileInputActive(false)}
          />
        </Dialog>

        {/* Sticky Footer with Gradient */}
        <Footer />
      </div>
    </DndContext>
  );
}
