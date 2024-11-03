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

import CriteriaInput from "../rubric-builder/CriteriaInput.tsx";
import Dialog from "../util/Dialog.tsx";
import CSVUpload from "./CSVUpload.tsx";
import Header from "../util/Header.tsx";
import Footer from "../util/Footer.tsx";
import createRubric, { Rubric } from "../../models/Rubric.ts";

import createRubricCriterion, {
  RubricCriterion,
} from "../../models/RubricCriterion.ts";
import { DndContext, DragEndEvent } from "@dnd-kit/core";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import createRating from "../../models/RubricRating.ts";
import { APIResponse, BackendAPI } from "../../Protocol/BackendRequests.ts";
import ModalChoiceDialog from "../util/ModalChoiceDialog.tsx";

// add type for to define our csv rows for the data field in papa parse
export type CSVRow = [string, ...(number | string)[]];

export default function RubricBuilder(): ReactElement {
  const [rubric, setRubric] = useState<Rubric>(createRubric());
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [isDialogOpen, setDialogOpen] = useState(false); // dialog when rubrics send. just for debugging/playing around.
  const [lastSentRubric, setLastSentRubric] = useState<Rubric>(createRubric()); // last rubric sent to server (for displaying in dialog)
  // Will delete when user feedback messages are added.
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

  // shorthand functions for opening and closing the dialog
  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

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

  // Build rubric object with latest state values and send to server
  const handleSubmitRubric = async (event: MouseEvent): Promise<void> => {
    event.preventDefault();

    try {
      // Check if the rubric already exists
      const { exists, id, error } = await BackendAPI.checkTitleExists(
        rubric.title
      );

      if (error) {
        alert(error);
        return;
      }

      if (exists) {
        setModalMessage(
          `A rubric with the title "${rubric.title}" already exists. How would you like to proceed?`
        );

        setModalChoices([
          {
            label: "Overwrite",
            action: async () => {
              closeModal();
              try {
                const result = await BackendAPI.update(id, rubric);
                handleApiResponse(result, rubric);
              } catch (error) {
                console.error("Failed to overwrite:", error);
                alert("An error occurred while overwriting the rubric.");
              }
            },
          },
          {
            label: "Make a Copy",
            action: async () => {
              closeModal();
              try {
                const newRubric: Rubric = {
                  ...rubric,
                  title: `${rubric.title} - Copy ${formatDate()}`,
                };
                const result = await BackendAPI.create(newRubric);
                handleApiResponse(result, newRubric);
              } catch (error) {
                console.error("Failed to create a copy:", error);
                alert("An error occurred while creating a copy of the rubric.");
              }
            },
          },
        ]);

        openModal();
      } else {
        // Create a new rubric if it doesn’t exist
        const result = await BackendAPI.create(rubric);
        handleApiResponse(result, rubric);
      }
    } catch (error) {
      console.error("Error during rubric submission:", error);
      alert("An error occurred while creating the rubric.");
    }
  };

  // Helper function to handle API responses
  const handleApiResponse = (
    result: APIResponse<Rubric>,
    rubricToSet: Rubric
  ) => {
    if (result.success) {
      setLastSentRubric(rubricToSet);
      openDialog();
      alert("Success!");
    } else if (result.errors && result.errors.length > 0) {
      alert(result.errors[0]);
    } else {
      alert("Operation failed!");
    }
  };

  // Helper function to format the current date/time for the copy title
  const formatDate = () => new Date().toLocaleString().replace(/\//g, "-");

  /**
   * Generates a set of the current criteria descriptions stored within the component state to use for checking
   * duplicate entries.
   */
  const buildCriteriaDescriptionSet = () =>
    new Set(
      rubric.rubricCriteria.map((criterion) =>
        criterion.description.trim().toLowerCase()
      )
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
            `Non-string or empty value in criterion description field: ${row[0]}. Throwing out entry.`
          );
          return null;
        }

        const criteriaDescription = row[0].trim().toLowerCase();
        // check for duplicates
        if (existingCriteriaDescriptions.has(criteriaDescription)) {
          console.warn(
            `Duplicate criterion found: ${criteriaDescription}. Throwing out entry.`
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
      0
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
        (criterion) => criterion.key === event.active.id
      );
      const newIndex = rubric.rubricCriteria.findIndex(
        (criterion) => criterion.key === event.over!.id // assert not null for type safety
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

        {/* Rubric Sending Dialog */}
        <Dialog
          isOpen={isDialogOpen}
          onClose={closeDialog}
          title={"Sending Rubric!"}
        >
          <pre className="text-black bg-gray-100 p-4 rounded-lg max-h-96 overflow-auto">
            {JSON.stringify(lastSentRubric, null, 2)}
          </pre>
        </Dialog>

        {/*CSV/XLSX Import Dialog*/}
        {/*todo: probably need to break this into its own component for styling*/}
        <Dialog
          isOpen={fileInputActive}
          onClose={() => setFileInputActive(false)}
          title={"THIS IS A VERY COOL DIALOG THAT WILL BE UPDATED"}
        >
          {renderFileImport()}
        </Dialog>

        {/* Sticky Footer with Gradient */}
        <Footer />
      </div>
    </DndContext>
  );
}
