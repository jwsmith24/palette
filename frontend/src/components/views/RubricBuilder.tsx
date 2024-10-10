/*
Main view for the Rubric Builder feature.
 */

import {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  useState,
} from "react";
import Rubric from "../../Rubric.ts";
import Criteria from "../../Criteria.ts";
import CriteriaInput from "../rubric-builder/CriteriaInput.tsx";
import CriteriaWidget from "../rubric-builder/CriteriaWidget.tsx";

export default function RubricBuilder(): ReactElement {
  const [rubric, setRubric] = useState<Rubric>(() => new Rubric()); // initialize state with a new Rubric object

  const handleRubricTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newRubric = new Rubric(event.target.value); // create new instance of rubric
    newRubric.criteria = [...rubric.criteria]; // copy criteria array over
    setRubric(newRubric); // calling the set method in useState will trigger a re-render (only if state has changed)
  };

  const addCriteria = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault(); // prevent page reload/form submitting
    const newCriteria = new Criteria();
    const newRubric = new Rubric(rubric.title); // deep copy active rubric
    newRubric.criteria = [...rubric.criteria];
    newRubric.addCriterion(newCriteria);
    setRubric(newRubric); // triggers rubric re-render with the new criteria
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
          value={rubric.title}
          onChange={handleRubricTitleChange}
        />

        <div className="mt-2">
          {rubric.criteria.map((criterion: Criteria, index: number) =>
            criterion.editView ? (
              <CriteriaInput
                key={index}
                criterion={criterion}
                index={index}
                rubric={rubric}
                setRubric={setRubric}
              />
            ) : (
              <CriteriaWidget
                key={index}
                criterion={criterion}
                index={index}
                rubric={rubric}
                setRubric={setRubric}
              />
            ),
          )}
        </div>
        <button
          className="mt-2 justify-self-end bg-gray-500 rounded-md px-2 font-bold hover:bg-violet-500 opacity-80 active:opacity-70"
          onClick={addCriteria}
        >
          Add Criteria
        </button>
      </form>
    </div>
  );
}
