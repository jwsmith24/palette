/* CriteriaInput.tsx
React component where the user can add/edit information for a given criterion. Displayed when a criterion is in
 "edit" view. (The CriteriaWidget component is rendered when a criterion is in "widget" view)
 */
import {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  useState,
} from "react";
import RatingInput from "./RatingInput.tsx";
import { CriteriaDisplayProps } from "../../interfaces/CriteriaDisplayProps.ts";
import Rating from "../../Rating.ts";

const CriteriaInput = ({
  criterion,
  index,
  toggleEditView,
}: CriteriaDisplayProps): ReactElement => {
  // Local state to manage form input and keep display updated prior to saving
  const [title, setTitle] = useState(criterion.title);
  const [ratings, setRatings] = useState(criterion.ratings);
  const [ratingCount, setRatingCount] = useState(criterion.ratings.length);

  // Update the criterion object with the current state values on save.
  const handleSaveCriteria = (event: ReactMouseEvent) => {
    event.preventDefault(); // stop form reload
    criterion.setTitle(title); // save title
    criterion.setRatings(ratings); // save ratings
    setRatings(criterion.ratings); // update state to render display
    toggleEditView(index); // render widget view on save
    alert("Criteria saved!"); // todo debug
    console.log(criterion);
  };

  // called when user clicks "remove" on a criterion
  // todo tbd
  const handleRemoveCriteria = (event: ReactMouseEvent) => {
    event.preventDefault();
    alert("Criteria removed!"); // debug - will remove
  };

  // called whenever the user hits a key within the Criteria Title input to keep the display updated
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value); // !! only updates local state !!
  };

  // callback to be used in Rating input component to update rating state here
  const updateRating = (index: number, updatedRating: Rating) => {
    const newRatings = [...ratings];
    newRatings[index] = updatedRating;
    setRatings(newRatings); // trigger re-render
  };

  // called whenever the user changes the amount of ratings to render the appropriate inputs
  const handleRatingCountChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let count = Number(event.target.value);
    if (ratings.length < count) {
      // add new Rating objects if count increases
      for (let i = ratings.length; i < count; i++) {
        ratings.push(new Rating());
      }
    } else {
      ratings.splice(count); // trims off excess rating objects
    }
    setRatingCount(Number(event.target.value)); // !! only updates local state !!
  };

  // displays rating input components based on ratingCount state (not Criteria.ratingCount)
  const renderRatingInputs = () => {
    const ratingInputs = [];
    for (let i = 0; i < ratingCount; i++) {
      ratingInputs.push(
        <RatingInput
          key={`rating-${index}-${i}`}
          entry={criterion.ratings[i]}
          ratingIndex={i}
          onChange={updateRating} // callback function to update state here in child component
        />,
      );
    }
    return ratingInputs;
  };

  return (
    <div key={index} className="rounded p-4 border-2 gap-2 grid">
      <label htmlFor={`criteria${index}`} className={"mr-2"}>
        Criteria {index + 1}
      </label>
      <input
        id={`criteria${index}`}
        type="text"
        placeholder="Criteria Description"
        className="rounded p-1 mb-2 hover:bg-gray-200 text-gray-600"
        value={title}
        onChange={(event) => handleTitleChange(event)}
        required
      />
      <label htmlFor={`ratingCount${index}`} className="font-bold mb-2">
        Number of Rating Options
      </label>
      <select
        id={`ratingCount${index}`}
        className="text-black rounded-b"
        value={ratingCount}
        onChange={handleRatingCountChange}
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
      </select>

      {/* Calling the function instead of passing a ref like the others because we want the function to execute
       immediately and return the JSX to display */}
      <div id={"ratingOptionsView"}>{renderRatingInputs()}</div>

      <div
        id={"criteriaOptions"}
        className={"grid grid-rows-1 auto-cols-auto grid-flow-col justify-end"}
      >
        {/*Here (and in other event handlers) we just pass a function reference so that it doesn't execute
         immediately, but rather when the event is triggered. In this case, when the user clicks save. */}
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
