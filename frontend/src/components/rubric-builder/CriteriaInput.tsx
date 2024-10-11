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
import Rating from "../../Rating.ts";
import Criteria from "../../Criteria.ts";

export default function CriteriaInput({
  index,
  criterion,
  handleCriteriaUpdate,
  removeCriterion,
}: {
  index: number;
  criterion: Criteria;
  handleCriteriaUpdate: (index: number, criterion: Criteria) => void;
  removeCriterion: (index: number) => void;
}): ReactElement {
  // State for form inputs (initial values set to what's in the object for edit case)
  const [title, setTitle] = useState(criterion.title);
  const [ratings, setRatings] = useState(criterion.ratings);

  // called when user clicks "remove" on a criterion
  // todo tbd
  const handleRemoveCriteria = (event: ReactMouseEvent) => {
    event.preventDefault();
    removeCriterion(index);
  };

  // update display
  const handleTitleChange = (event: ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    const newTitle = event.target.value;
    setTitle(newTitle); // !! only updates input value !!
    const newCriteria = { ...criterion, title: newTitle };
    handleCriteriaUpdate(index, newCriteria);
  };

  // callback to be used in Rating input component to update rating state here
  const updateRating = (index: number, updatedRating: Rating) => {
    const newRatings = [...ratings];
    newRatings[index] = updatedRating; // updating target rating with new info
    setRatings(newRatings); // trigger re-render
  };

  // called whenever the user changes the amount of ratings to render the appropriate inputs
  const handleRatingCountChange = (event: ChangeEvent<HTMLSelectElement>) => {
    let count = Number(event.target.value);

    // add new Rating objects if count increases
    let newRatings: Rating[];

    if (count < ratings.length) {
      // shrink array if count decreases
      newRatings = ratings.slice(0, count);
    } else {
      // copy over existing ratings
      newRatings = [...ratings];
      // add new rating objects from last rating to new count
      for (let i = ratings.length; i < count; i++) {
        newRatings.push(new Rating());
      }
    }

    setRatings(newRatings);
    const newCriteria = { ...criterion, ratings: newRatings };
    handleCriteriaUpdate(index, newCriteria);
  };

  // displays rating input components based on local rating state (not Criteria.ratingCount)
  const renderRatingInputs = () => {
    return ratings.map((rating: Rating, index: number) => {
      return (
        <RatingInput
          key={rating.id}
          rating={rating}
          ratingIndex={index}
          updateRating={updateRating} // callback function to update state here in child component
        />
      );
    });
  };

  return (
    <div key={criterion.id} className="rounded p-4 border-2 gap-2 grid">
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
        value={ratings.length}
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
}
