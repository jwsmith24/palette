/*
Main view for the Rubric Builder feature.
 */

import React, {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";

import CriteriaInput from "./CriteriaInput.tsx";
import Dialog from "../../components/Dialog.tsx";
import CSVUpload from "./CSVUpload.tsx";
import Header from "../../components/Header.tsx";
import Footer from "../../components/Footer.tsx";
import { Rubric, createRubric } from "./Rubric.ts";

import createRubricCriterion, { RubricCriterion } from "./RubricCriterion.ts";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import createRating from "./RubricRating.ts";
import ModalChoiceDialog from "../../components/ModalChoiceDialog.tsx";
import formatDate from "../../utils/formatDate.ts";
import useFetch from "../../hooks/useFetch.ts";

// add type for to define our csv rows for the data field in papa parse
export type CSVRow = [string, ...(number | string)[]];

export default function RubricBuilder(): ReactElement {
  const [rubric, setRubric] = useState<Rubric>(createRubric());
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [fileInputActive, setFileInputActive] = useState(false); // file input display is open or not
  const [activeCriterionIndex, setActiveCriterionIndex] = useState(-1);

  // Define type for modal choices
  interface ModalChoice {
    label: string;
    action: () => Promise<void>;
  }

  // For ModalChoiceDialog state
  const [isModalOpen, setModalOpen] = useState(false);
  const [modalMessage, setModalMessage] = useState("");
  const [modalChoices, setModalChoices] = useState<ModalChoice[]>([
    {
      label: "",
      action: async () => {}, // define action to expect async function
    },
  ]);

  // shorthand functions for opening and closing the modal
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Ensure title is updated independently of the rest of the rubric
  const handleRubricTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newRubric = { ...rubric };
    newRubric.title = event.target.value;
    setRubric(newRubric);
  };

  // Effect hook to update total points display on initial mount and anytime the rubric state changes
  useEffect(() => {
    calculateTotalPoints();
  }, [rubric]);

  /**
   * Custom fetch hook provides a `fetchData` callback to send any type of fetch request.
   *
   * See PaletteAPIRequest for options structure.
   */
  const { response: postRubricResponse, fetchData: postRubric } = useFetch(
    "/rubrics",
    {
      method: "POST",
      body: JSON.stringify(rubric), // use latest rubric data
    },
  );

  const { response: putRubricResponse, fetchData: putRubric } = useFetch(
    `rubrics/${rubric.id}`,
    {
      method: "PUT",
      body: JSON.stringify(rubric),
    },
  );

  const handleExistingRubric = () => {
    setModalMessage(
      `A rubric with the title "${rubric.title}" already exists. How would you like to proceed?`,
    );

    setModalChoices([
      {
        label: "Overwrite",
        action: async () => {
          closeModal();
          await putRubric();

          if (putRubricResponse.success) {
            setModalMessage("Rubric was overwritten successfully!");
          } else {
            setModalMessage(
              `Error overwriting the rubric: ${putRubricResponse.error}`,
            );
          }
          openModal(); // show modal with response
        },
      },
      {
        label: "Make a Copy",
        action: async () => {
          closeModal();
          // update title
          const newRubric = {
            ...rubric,
            title: `${rubric.title} - Copy ${formatDate()}`,
          };
          setRubric(newRubric); // update state with latest before using hook
          await postRubric();

          if (postRubricResponse.success) {
            setModalMessage(`Rubric ${newRubric.title} created successfully!`);
          } else {
            setModalMessage(`Error creating copy: ${postRubricResponse.error}`);
          }
          openModal();
        },
      },
    ]);

    openModal();
  };

  // Build rubric object with latest state values and send to server
  const handleSubmitRubric = async (event: MouseEvent): Promise<void> => {
    event.preventDefault();
    await postRubric(); // triggers the POST request for the active rubric

    // check the response for errors
    if (
      postRubricResponse.error &&
      postRubricResponse.error.includes("already exists")
    ) {
      // handle duplicate title (prompt overwrite, make a copy, or cancel)
      handleExistingRubric();
    } else if (postRubricResponse.success) {
      // handle successful submission
      setModalMessage(`Rubric for ${rubric.title} submitted successfully!`);
      openModal();
    } else {
      // handle any other errors
      setModalMessage(postRubricResponse.error!);
      openModal();
    }
  };

  /**
   * Generates a set of the current criteria descriptions stored within the component state to use for checking
   * duplicate entries.
   */
  const buildCriteriaDescriptionSet = () =>
    new Set(
      rubric.rubricCriteria.map((criterion) =>
        criterion.description.trim().toLowerCase(),
      ),
    );

  // Update state with the new CSV/XLSX data
  const handleImportFile = (data: CSVRow[]) => {
    console.log("data that rubric builder gets: ", data);
    // create a set of current criteria descriptions to optimize duplicate check
    const existingCriteriaDescriptions = buildCriteriaDescriptionSet();

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
        const criterion: RubricCriterion = createRubricCriterion(row[0]); // use the original format

        // process ratings in their column pairs
        for (let i = 1; i < row.length; i += 2) {
          const points = Number(row[i] as number); // Ratings (B, D, F, etc.)
          const description = row[i + 1] as string; // add type assertions

          // If points and description are valid, create a new Rating and add it to the ratings array
          const rating = createRating(points, description);
          console.log(rating);
          criterion.ratings.push(rating);
        }
        criterion.updatePoints();
        return criterion;
      })
      .filter((criterion) => criterion !== null); // remove null values (bad entries)

    // update rubric state
    setRubric((prevRubric) => ({
      ...prevRubric,
      rubricCriteria: [...prevRubric.rubricCriteria, ...newCriteria],
    }));
  };

  // function to iterate through each criterion and sum total max points for entire rubric
  const calculateTotalPoints = () => {
    const total: number = rubric.rubricCriteria.reduce(
      (sum: number, criterion: RubricCriterion) => {
        if (isNaN(criterion.points)) {
          return sum; // do not add bad value
        }
        return sum + Number(criterion.points); // ensure points aren't treated as a string
      },
      0,
    ); // Initialize sum as 0
    console.log(total);
    setTotalPoints(total); // Update state with the total points
  };

  // update rubric state with new list of criteria
  const handleAddCriteria = (event: MouseEvent) => {
    event.preventDefault();
    const newCriteria = [...rubric.rubricCriteria, createRubricCriterion()];
    setRubric({ ...rubric, rubricCriteria: newCriteria });
    setActiveCriterionIndex(newCriteria.length - 1);
  };

  const handleRemoveCriterion = (index: number) => {
    const newCriteria = [...rubric.rubricCriteria];
    newCriteria.splice(index, 1); // remove the target criterion from the array
    setRubric({ ...rubric, rubricCriteria: newCriteria });
  };

  // update criterion at given index
  const handleUpdateCriterion = (index: number, criterion: RubricCriterion) => {
    const newCriteria = [...rubric.rubricCriteria]; // copy criteria to new array
    newCriteria[index] = criterion; // update the criterion with changes;
    setRubric({ ...rubric, rubricCriteria: newCriteria }); // update rubric to have new criteria
  };

  const renderFileImport = () => {
    if (fileInputActive) {
      return (
        <CSVUpload
          onDataChange={(data: CSVRow[]) => handleImportFile(data)}
          closeImportCard={handleCloseImportCard}
        />
      );
    }
  };

  const handleImportFilePress = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!fileInputActive) {
      setFileInputActive(true);
    }
  };

  const handleCloseImportCard = () => {
    setFileInputActive(false); // hides the import file card
  };

  // Fires when drag event is over to re-sort criteria
  const handleDragEnd = (event: DragEndEvent) => {
    if (event.over) {
      const oldIndex = rubric.rubricCriteria.findIndex(
        (criterion) => criterion.key === event.active.id,
      );
      const newIndex = rubric.rubricCriteria.findIndex(
        (criterion) => criterion.key === event.over!.id, // assert not null for type safety
      );

      const updatedCriteria = [...rubric.rubricCriteria];
      const [movedCriterion] = updatedCriteria.splice(oldIndex, 1);
      updatedCriteria.splice(newIndex, 0, movedCriterion);

      setRubric({ ...rubric, rubricCriteria: updatedCriteria });
    }
  };

  // render criterion card for each criterion in the array
  const renderCriteria = () => {
    return (
      <SortableContext
        items={rubric.rubricCriteria.map((criterion) => criterion.key)}
        strategy={verticalListSortingStrategy}
      >
        {rubric.rubricCriteria.map((criterion, index) => (
          <CriteriaInput
            key={criterion.key}
            index={index}
            activeCriterionIndex={activeCriterionIndex}
            criterion={criterion}
            handleCriteriaUpdate={handleUpdateCriterion}
            removeCriterion={handleRemoveCriterion}
            setActiveCriterionIndex={setActiveCriterionIndex}
          />
        ))}
      </SortableContext>
    );
  };
  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="min-h-screen justify-between flex flex-col w-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white font-sans">
        {/* Sticky Header with Gradient */}
        <Header />
        {/* Form Section */}
        <form className="h-full self-center grid p-10 w-full max-w-3xl my-6 gap-6 bg-gray-800 shadow-lg rounded-lg">
          {/* Main Heading */}
          <h1 className="font-extrabold text-5xl mb-2 text-center">
            Create a new rubric
          </h1>

          <div className={"flex justify-between"}>
            {/*Import CSV/XLSX File*/}
            <button
              className={
                "transition-all ease-in-out duration-300 bg-violet-600 text-white font-bold rounded-lg py-2 px-4" +
                " hover:bg-violet-700 hover:scale-105 focus:outline-none focus:ring-2" +
                " focus:ring-violet-500"
              }
              onClick={handleImportFilePress}
            >
              Import CSV
            </button>
            {/* Rubric Total Points */}
            <h2 className="text-2xl font-extrabold bg-green-600 text-black py-2 px-4 rounded-lg">
              {totalPoints} {totalPoints === 1 ? "Point" : "Points"}
            </h2>
          </div>

          {/* Rubric Title Input */}
          <input
            type="text"
            placeholder="Rubric title"
            className={
              "rounded p-3 mb-4 hover:bg-gray-200 focus:bg-gray-300 focus:ring-2 focus:ring-blue-500" +
              " focus:outline-none text-gray-800 w-full max-w-full text-xl truncate whitespace-nowrap"
            }
            name="rubricTitle"
            id="rubricTitle"
            value={rubric.title}
            onChange={handleRubricTitleChange}
          />

          {/* Criteria Section */}
          <div className="mt-6 grid gap-3 h-[35vh] max-h-[50vh] overflow-y-auto overflow-hidden scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-800">
            {renderCriteria()}
          </div>

          {/* Buttons */}
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
                handleSubmitRubric(event).catch((error) => {
                  console.error("Error handling rubric submission: ", error);
                });
              }}
              // instead of
              // promise
            >
              Save Rubric
            </button>
          </div>
        </form>

        {/* ModalChoiceDialog */}
        <ModalChoiceDialog
          show={isModalOpen}
          onHide={closeModal}
          title={"Rubric Already Exists"}
          message={modalMessage}
          choices={modalChoices}
        />

        {/*CSV/XLSX Import Dialog*/}
        <Dialog
          isOpen={fileInputActive}
          onClose={() => setFileInputActive(false)}
          title={"Import a CSV Template"}
        >
          {renderFileImport()}
        </Dialog>

        {/* Sticky Footer with Gradient */}
        <Footer />
      </div>
    </DndContext>
  );
}
