/* CriteriaInput.tsx
React component where the user can add/edit information for a given criterion. Displayed when a criterion is in
 "edit" view. (The CriteriaWidget component is rendered when a criterion is in "widget" view)
 */
import {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
} from "react";
import RatingInput from "./RatingInput.tsx";
import Rubric from "../../Rubric.ts";
import { CriteriaDisplayProps } from "../../interfaces/CriteriaDisplayProps.ts";

const CriteriaInput = ({
  criterion,
  index,
  rubric,
  setRubric,
}: CriteriaDisplayProps): ReactElement => {
  const handleSaveCriteria = (event: ReactMouseEvent) => {
    event.preventDefault(); // prevent button from submitting the form
    criterion.toggleEditView(); // render widget view on save
    const newRubric = new Rubric(rubric.title); // React requires a deep copy to trigger a re-render
    newRubric.criteria = [...rubric.criteria]; // deep copy part two
    setRubric(newRubric); // passing a completely new ref to the useState hook will now re-render the display and
    // show the widget instead of the edit view.
    alert("Criteria saved!"); // for debug - will remove
  };

  // called when user clicks "remove" on a criterion
  const handleRemoveCriteria = (event: ReactMouseEvent) => {
    event.preventDefault();
    alert("Criteria removed!"); // debug - will remove
  };

  // called whenever the user hits a key within the Criteria Title input to keep the display updated
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

  // called whenever the user changes the amount of ratings to render the appropriate inputs
  const handleCriteriaRatingCountChange = (
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
          onChange={(event) => handleCriteriaRatingCountChange(event, index)}
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
            onClick={handleSaveCriteria}
          >
            Save
          </button>
          <button
            className={
              "bg-gray-500 rounded-md px-2 font-bold hover:bg-red-500 opacity-80" +
              " active:opacity-70"
            }
            onClick={handleRemoveCriteria}
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CriteriaInput;
