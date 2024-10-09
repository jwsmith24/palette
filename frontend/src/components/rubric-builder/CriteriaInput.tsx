// CriteriaInput.tsx
import {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
} from "react";
import Criteria from "../../Criteria.ts";
import RatingInput from "./RatingInput.tsx";
import Rubric from "../../Rubric.ts";

interface CriteriaInputProps {
  criterion: Criteria;
  index: number;
  rubric: Rubric; // Add rubric prop
  setRubric: (rubric: Rubric) => void; // Add setRubric prop
}

const CriteriaInput = ({
  criterion,
  index,
  rubric,
  setRubric,
}: CriteriaInputProps): ReactElement => {
  const handleCriteriaSave = (event: ReactMouseEvent) => {
    event.preventDefault();
    alert("Criteria saved!");
  };

  const handleCriteriaRemove = (event: ReactMouseEvent) => {
    event.preventDefault();
    alert("Criteria removed!");
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
    setRubric(newRubric); // Use the passed setRubric function
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
    setRubric(newRubric); // Use the passed setRubric function
  };

  return (
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
        <RatingInput
          ratingCount={criterion.ratingCount}
          criteriaIndex={index}
        />
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
};

export default CriteriaInput;
