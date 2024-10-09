import {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  useState,
} from "react";
import Rubric from "../../Rubric.ts";
import Criteria from "../../Criteria.ts";
import RatingInput from "../rubric-builder/RatingInput.tsx";

export default function RubricBuilder(): ReactElement {
  const [rubric, setRubric] = useState<Rubric>(() => new Rubric());

  const handleRubricTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const newRubric = new Rubric(event.target.value); // create new instance of rubric
    newRubric.criteria = [...rubric.criteria]; // copy criteria array over
    setRubric(newRubric); // calling the set method in useState will trigger a re-render (as long as state has changed)
  };

  const addCriteria = (event: ReactMouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const newCriteria = new Criteria();
    const newRubric = new Rubric(rubric.title);
    newRubric.criteria = [...rubric.criteria];
    newRubric.addCriterion(newCriteria);
    setRubric(newRubric);
  };

  const handleCriteriaTitleChange = (
    event: ChangeEvent<HTMLInputElement>,
    index: number,
  ) => {
    const newRubric = new Rubric(rubric.title);
    newRubric.criteria = [...rubric.criteria];
    const criteria = newRubric.getCriterion(index);
    criteria.setTitle(event.target.value);
    newRubric.updateCriterion(index, criteria);
    setRubric(newRubric);
  };

  const handleRatingCountChange = (
    event: ChangeEvent<HTMLSelectElement>,
    index: number,
  ) => {
    const newRatingCount = Number(event.target.value);
    const newRubric = new Rubric(rubric.title);
    newRubric.criteria = [...rubric.criteria];
    const criteria = newRubric.getCriterion(index);
    criteria.setRatingCount(newRatingCount);
    newRubric.updateCriterion(index, criteria);
    setRubric(newRubric);
  };

  const renderCriteriaInput = (criterion: Criteria, index: number) => (
    <div key={index} className="border p-4 gap-2 grid">
      <label htmlFor={`criteria${index}Title`} className={"mr-2"}>
        Criteria {index + 1}
      </label>
      <input
        name={`criteria${index}Title`}
        id={`criteria${index}Title`}
        type="text"
        placeholder="Criteria Description"
        className="rounded p-1 mb-2 hover:bg-gray-200 text-gray-600"
        value={criterion.title}
        onChange={(event) => handleCriteriaTitleChange(event, index)}
        required
      />

      <div id={"ratingOptionsSelector"}>
        <h2 className="font-bold mb-2">Number of Rating Options</h2>
        <select
          className="text-black rounded-b"
          name={`ratingCount${index}`}
          id={`ratingCount${index}`}
          value={criterion.ratingCount}
          onChange={(event) => handleRatingCountChange(event, index)}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

      <div id={"ratingOptionsView"}>
        {RatingInput(criterion.ratingCount, index)}
      </div>
      <div
        id={"criteriaOptions"}
        className={"grid grid-rows-1 auto-cols-auto grid-flow-col justify-end"}
      >
        <div id={"criterionOptButtons"} className={"flex gap-2"}>
          <button
            className={
              "bg-gray-500 rounded-md px-2 font-bold hover:bg-green-500 opacity-80" +
              " active:opacity-70"
            }
            onClick={handleCriteriaSave}
          >
            Save
          </button>
          <button
            className={
              "bg-gray-500 rounded-md px-2 font-bold hover:bg-red-500 opacity-80" +
              " active:opacity-70"
            }
            onClick={handleCriteriaRemove}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );

  const handleCriteriaSave = (event: ReactMouseEvent) => {
    event.preventDefault();
    alert("ahhhh");
  };

  const handleCriteriaRemove = (event: ReactMouseEvent) => {
    event.preventDefault();
    alert("mehhhhh");
  };

  return (
    <div className="h-max min-h-dvh w-dvw bg-gray-800 text-white font-sans">
      <form className="grid p-8 w-1/2 g-3">
        <h1 className="font-bold text-3xl mb-4">Create a new rubric</h1>

        <label htmlFor="rubricTitle" className={"mb-2"}>
          Rubric Title
        </label>
        <input
          type="text"
          placeholder="Task: Description"
          className="rounded p-1 mb-2 hover:bg-gray-200 focus:outline-0 text-gray-600"
          name="rubricTitle"
          id="rubricTitle"
          value={rubric.title}
          onChange={handleRubricTitleChange}
        />

        <div className="mt-2">
          {rubric.criteria.map((criterion: Criteria, index: number) =>
            renderCriteriaInput(criterion, index),
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
