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

        <h1 className="font-extrabold text-2xl mb-2 text-center">
            <p>Work in progress...</p>
        </h1>

      {/* Sticky Footer with Gradient */}
      <Footer />
    </div>
  );
}
