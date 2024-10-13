/*
Main view for the Rubric Builder feature.
 */

import { ChangeEvent, ReactElement, useEffect, useState } from "react";
import Criteria from "../../Criteria.ts";
import CriteriaInput from "../rubric-builder/CriteriaInput.tsx";
import Rubric from "../../Rubric.ts";

export default function RubricBuilder(): ReactElement {
  const [rubric, setRubric] = useState<Rubric>(new Rubric()); // track state for whole rubric
  const [title, setTitle] = useState<string>(""); // track state for rubric title input

  const handleRubricTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // update rubric state with new list of criteria
  const handleAddCriteria = () => {
    const newCriteria = [...rubric.criteria, new Criteria()];
    setRubric({ ...rubric, criteria: newCriteria });
  };

  const handleRemoveCriterion = (index: number) => {
    const newCriteria = [...rubric.criteria];
    newCriteria.splice(index, 1); // remove the target criterion
    console.log(newCriteria);
    setRubric({ ...rubric, criteria: newCriteria });
  };

  // update criterion at given index
  const handleCriterionUpdate = (index: number, criterion: Criteria) => {
    const newCriteria = [...rubric.criteria]; // copy criteria to new array
    newCriteria[index] = criterion; // update the criterion with changes;
    setRubric({ ...rubric, criteria: newCriteria }); // update rubric to have new criteria
  };

  // render either the edit or widget view
  const renderCriteria = () => {
    return rubric.criteria.map((criterion: Criteria, index: number) => (
      <CriteriaInput
        key={criterion.id}
        index={index}
        criterion={criterion}
        handleAddCriteria={handleAddCriteria}
        handleCriteriaUpdate={handleCriterionUpdate}
        removeCriterion={handleRemoveCriterion}
      />
    ));
  };

  const fakeRubrics = [
    "critiquing bird noises",
    "building a dungeon crawler",
    "figuring out what gRPC is",
    "canceling AWS before it charges your card",
    "SELECTing everything",
  ];

  const selectPlaceHolder = () => {
    return fakeRubrics[Math.floor(Math.random() * fakeRubrics.length)];
  };

  const [placeholder, setPlaceholder] = useState("");

  // This effect runs once when the component mounts and then only if the title field changes to keep it from
  // going all crazy when a re-render occurs
  useEffect(() => {
    if (!title) {
      setPlaceholder(selectPlaceHolder());
    }
  }, [title]);

  return (
    <div className="min-h-screen w-screen bg-gray-800 text-white font-sans">
      {/* Sticky Header with Gradient */}
      <div className="bg-gradient-to-r from-red-500 via-green-500 to-purple-500 h-8 sticky top-0"></div>

      {/* Form Section */}
      <form className="grid p-8 w-full max-w-2xl mx-auto gap-4">
        {/* Main Heading */}
        <h1 className="font-bold text-5xl mb-2">Create a new rubric for</h1>
        <h2 className="font-medium italic text-3xl mb-4">
          {title || placeholder}
        </h2>

        {/* Rubric Title Input */}
        <label htmlFor="rubricTitle" className="mb-2">
          Rubric Title
        </label>
        <input
          type="text"
          placeholder="Task: Description"
          className="rounded p-2 mb-2 hover:bg-gray-200 focus:outline-0 text-gray-600 w-full"
          name="rubricTitle"
          id="rubricTitle"
          value={title}
          onChange={handleRubricTitleChange}
        />

        {/* Criteria Section */}
        <div className="mt-4 grid gap-4">{renderCriteria()}</div>
      </form>
    </div>
  );
}
