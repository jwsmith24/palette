/*
Main view for the Rubric Builder feature.
 */

import {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  useState,
} from "react";
import Criteria from "../../Criteria.ts";
import CriteriaInput from "../rubric-builder/CriteriaInput.tsx";
import CriteriaWidget from "../rubric-builder/CriteriaWidget.tsx";

export default function RubricBuilder(): ReactElement {
  const [title, setTitle] = useState<string>(""); // initialize title field with empty string;
  const [criteria, setCriteria] = useState<Criteria[]>([]); // initialize criteria with empty array

  //todo: add a save rubric function
  // Handle rubric title change
  const handleRubricTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  // Handle adding new criteria
  const addCriteria = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    setCriteria((prevCriteria) => [...prevCriteria, new Criteria()]); // add new criteria to array
  };

  const toggleEditView = (index: number) => {
    setCriteria((prevCriteria) => {
      const updatedCriteria = [...prevCriteria];
      updatedCriteria[index].toggleEditView();
      return updatedCriteria;
    });
  };

  // render either the edit or widget view
  const renderCriteria = () => {
    return criteria.map((criterion: Criteria, index: number) =>
      criterion.editView ? (
        <CriteriaInput
          key={index}
          criterion={criterion}
          index={index}
          toggleEditView={toggleEditView}
        />
      ) : (
        <CriteriaWidget
          key={index}
          criterion={criterion}
          index={index}
          toggleEditView={toggleEditView}
        />
      ),
    );
  };

  return (
    <div className="h-max min-h-dvh w-dvw  bg-gray-800 text-white font-sans">
      <form className="grid p-8 w-1/2 g-3 max-w-2xl">
        <h1 className="font-bold text-3xl mb-4">Create a new rubric</h1>

        <label htmlFor="rubricTitle" className={"mb-2"}>
          Rubric Title
        </label>
        <input
          type="text"
          placeholder="Task: Description"
          className="rounded p-1 mb-2 hover:bg-gray-200 focus:outline-0 text-gray-600 "
          name="rubricTitle"
          id="rubricTitle"
          value={title}
          onChange={handleRubricTitleChange}
        />

        <div className="mt-2">{renderCriteria()}</div>
        <button
          type={"button"}
          className="mt-2 justify-self-end bg-gray-500 rounded-md px-2 font-bold hover:bg-violet-500 opacity-80 active:opacity-70"
          onClick={addCriteria}
        >
          Add Criteria
        </button>
      </form>
    </div>
  );
}
