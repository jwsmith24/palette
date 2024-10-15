/*
Main view for the Rubric Builder feature.
 */

import {
  ChangeEvent,
  MouseEvent,
  ReactElement,
  useEffect,
  useState,
} from "react";

import CriteriaInput from "../rubric-builder/CriteriaInput.tsx";
import Dialog from "../util/Dialog.tsx";
import CSVUpload from "../util/CSVUpload.tsx";
import Header from "../util/Header.tsx";
import Footer from "../util/Footer.tsx";
import { Rubric } from "../../models/types/rubric.ts";
import createRubric from "../../models/Rubric.ts";
import { Criteria } from "../../models/types/criteria.ts";
import createCriterion from "../../models/Criteria.ts";

export default function RubricBuilder(): ReactElement {
  const [rubric, setRubric] = useState<Rubric>(createRubric());
  const [totalPoints, setTotalPoints] = useState<number>(0);
  const [isDialogOpen, setDialogOpen] = useState(false);
  const [fileData, setFileData] = useState<string[]>([]);

  const openDialog = () => setDialogOpen(true);
  const closeDialog = () => setDialogOpen(false);

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
  const handleSubmitRubric = (event: MouseEvent) => {
    event.preventDefault();
    console.log(submitRubric(rubric));
    openDialog();
  };

  // function to send rubric to the server
  const submitRubric = async (rubric: Rubric) => {
    try {
      const res = await fetch("http://localhost:3000/rubrics", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(rubric),
      });

      if (res.ok) {
        const data = await res.json();
        console.log("Rubric saved!", data);
      } else {
        console.error("Error connecting to server");
      }
    } catch (error) {
      console.error(error); // update error message with more deets
    }
  };

  // Update state with the new CSV data
  const handleImportFile = (data: string[]) => {
    setFileData(data);
  };

  // function to iterate through each criterion and sum total max points for entire rubric
  const calculateTotalPoints = () => {
    const total: number = rubric.criteria.reduce(
      (sum: number, criterion: Criteria) => {
        return sum + criterion.getMaxPoints();
      },
      0,
    ); // Initialize sum as 0
    setTotalPoints(total); // Update state with the total points
  };

  // update rubric state with new list of criteria
  const handleAddCriteria = (event: MouseEvent) => {
    event.preventDefault();
    const newCriteria = [...rubric.criteria, createCriterion()];
    // @ts-ignore
    setRubric({ ...rubric, criteria: newCriteria });
  };

  const handleRemoveCriterion = (index: number) => {
    const newCriteria = [...rubric.criteria];
    newCriteria.splice(index, 1); // remove the target criterion from the array
    // @ts-ignore
    setRubric({ ...rubric, criteria: newCriteria });
  };

  // update criterion at given index
  const handleUpdateCriterion = (index: number, criterion: Criteria) => {
    const newCriteria = [...rubric.criteria]; // copy criteria to new array
    newCriteria[index] = criterion; // update the criterion with changes;
    // @ts-ignore
    setRubric({ ...rubric, criteria: newCriteria }); // update rubric to have new criteria
  };

  // render criterion card for each criterion in the array
  const renderCriteria = () => {
    return rubric.criteria.map((criterion: Criteria, index: number) => (
      <CriteriaInput
        key={criterion.id}
        index={index}
        criterion={criterion}
        handleCriteriaUpdate={handleUpdateCriterion}
        removeCriterion={handleRemoveCriterion}
      />
    ));
  };

  return (
    <div className="min-h-screen flex flex-col justify-between w-screen bg-gradient-to-b from-gray-900 to-gray-700 text-white font-sans">
      {/* Sticky Header with Gradient */}
      <Header />

      {/* Form Section */}
      <form className="grid p-10 w-full max-w-3xl mx-auto gap-6 bg-gray-800 shadow-lg rounded-lg">
        {/* Main Heading */}
        <h1 className="font-extrabold text-5xl mb-2 text-center">
          Create a new rubric
        </h1>

        {/* Rubric Total Points */}
        <h2 className="justify-self-end text-2xl font-extrabold bg-green-600 text-black py-2 px-4 rounded-lg">
          {totalPoints} Points
        </h2>

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

        {/* CSV Upload Section */}
        <CSVUpload onDataChange={handleImportFile} />

        {/* Uploaded Rubric Data */}
        {fileData.length > 0 && (
          <div className="mt-6">
            <h2 className="text-xl font-semibold mb-2">Uploaded Rubric Data</h2>
            <ul className="bg-gray-100 rounded-lg p-4 text-black">
              {fileData.map((row, index) => (
                <li key={index} className="border-b py-2">
                  {row}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Criteria Section */}
        <div className="mt-6 grid gap-6">{renderCriteria()}</div>

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
            onClick={handleSubmitRubric}
          >
            Save Rubric
          </button>
        </div>
      </form>

      {/* Dialog */}
      <Dialog
        isOpen={isDialogOpen}
        onClose={closeDialog}
        title={"Sending Rubric!"}
      >
        <pre className="text-black bg-gray-100 p-4 rounded-lg max-h-96 overflow-auto">
          {JSON.stringify(rubric, null, 2)}
        </pre>
      </Dialog>

      {/* Sticky Footer with Gradient */}
      <Footer />
    </div>
  );
}
