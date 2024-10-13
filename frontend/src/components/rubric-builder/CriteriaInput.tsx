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
  handleAddCriteria,
  handleCriteriaUpdate,
  removeCriterion,
}: {
  index: number;
  criterion: Criteria;
  handleAddCriteria: () => void;
  handleCriteriaUpdate: (index: number, criterion: Criteria) => void;
  removeCriterion: (index: number) => void;
}): ReactElement {
  // State for form inputs (initial values set to what's in the object for edit case)
  const [title, setTitle] = useState(criterion.title);
  const [ratings, setRatings] = useState(criterion.ratings);
  const [active, setActive] = useState(true); // track whether criteria card is in edit view or widget view

  // called when user clicks "remove" on a criterion
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

  const handleAddCriteriaButton = (event: ReactMouseEvent) => {
    event.preventDefault();
    setActive(false);
    handleAddCriteria();
  };

  const changeCriteriaView = () => {
    setActive(true);
  };

  // function render the criteria in edit mode
  const renderEditView = () => (
    <div
      key={criterion.id}
      className="bg-white shadow-lg rounded-lg p-6 border border-gray-200 w-full mb-4"
    >
      <label
        htmlFor={`criteria${index}`}
        className={"mb-2 text-xl font-semibold text-gray-900"}
      >
        Criteria {index + 1}
      </label>
      <div
        id={`${criterion.id}content`}
        className={
          "text-gray-700 grid text-sm md:text-base leading-relaxed mb-4"
        }
      >
        <input
          id={`criteria${index}`}
          type="text"
          placeholder="Enter criteria description..."
          className={
            "rounded mb-2 p-2 hover:bg-gray-100 border-2 border-gray-300 focus:border-blue-500"
          }
          value={title}
          onChange={handleTitleChange}
          required
        />
        <label htmlFor={`ratingCount${index}`}>Number of Rating Options</label>
        <select
          id={`ratingCount${index}`}
          value={ratings.length}
          className={
            "rounded p-2 hover:bg-gray-100 border-2 border-gray-300 w-1/3"
          }
          onChange={handleRatingCountChange}
        >
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
        </select>
      </div>

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
            className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-red-500 transition duration-200 ease-in-out"
            onClick={handleRemoveCriteria}
          >
            Remove
          </button>
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition duration-200 ease-in-out"
            onClick={handleAddCriteriaButton}
          >
            Add
          </button>
        </div>
      </div>
    </div>
  );

  // function to render the criteria as a widget
  const renderWidgetView = () => {
    return (
      <div className="border p-4 mb-2" onClick={changeCriteriaView}>
        <div id={"widgetInfo"} className={"flex justify-between"}>
          <p className="font-bold">{title || `Criteria ${index + 1}`}</p>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            viewBox="0 0 16 16"
          >
            <path
              fill-rule="evenodd"
              d="M1.5 5.5a.5.5 0 0 1 .707 0L8 11.293l5.793-5.793a.5.5 0 0 1 .707.707l-6 6a.5.5 0 0 1-.707 0l-6-6a.5.5 0 0 1 0-.707z"
            />
          </svg>
        </div>
      </div>
    );
  };

  const [activeRating, setActiveRating] = useState(0);
  const [description, setDescription] = useState(ratings[0].description);

  const handleRatingClick = (event: ReactMouseEvent, index: number) => {
    event.preventDefault();
    setActiveRating(index);
    setDescription(ratings[index].description);
  };

  // pre-define css color class so they're not purged and can be used for dynamic rendering
  const colorClasses = [
    "bg-blue-500 hover:bg-blue-500",
    "bg-green-500 hover:bg-green-500",
    "bg-yellow-500 hover:bg-yellow-500",
    "bg-gray-500 hover:bg-gray-500",
  ];

  // renders number of buttons == number of ratings in the array. uses their set color
  const renderRatingButtons = () => {
    return criterion.ratings.map((rating: Rating, index: number) => {
      const colorClass = colorClasses[index] || colorClasses[3];

      return (
        <button
          className={`transition-all hover:scale-105 ease-in-out duration-300 font-bold rounded-lg px-2 py-1 text-black hover:${colorClass} active:opacity-70 ${
            activeRating === index
              ? `${colorClass} text-white scale-105`
              : "bg-gray-200"
          }`}
          key={rating.id}
          onClick={(event) => handleRatingClick(event, index)}
        >
          {rating.points === 1
            ? `${rating.points} point`
            : `${rating.points} points`}
        </button>
      );
    });
  };
  // function to render the criteria as a widget
  const renderTestWidgetView = () => {
    return (
      // Criterion widget
      <div
        className={
          "grid grid-rows-2 border border-white w-full p-4 gap-2 rounded-md"
        }
      >
        {/*Top Row*/}
        <div className={"flex gap-2 justify-between"}>
          <p>{criterion.title}</p>
          <div className={"flex gap-3"}>{renderRatingButtons()}</div>
        </div>
        {/*Bottom Row*/}
        <div>{description}</div>
      </div>
    );
  };

  const renderEditableView = () => {
    return (
      // Criterion widget
      <div
        className={
          "grid grid-rows-2 border border-white w-full p-4 gap-2 rounded-md"
        }
      >
        {/*Top Row*/}
        <div className={"flex gap-2 justify-between"}>
          <input
            type={"text"}
            placeholder={`Criteria ${index + 1} Title...`}
            className={"rounded p-2 text-gray-500"}
          />

          <div className={"flex gap-3"}>{renderRatingButtons()}</div>
        </div>
        {/*Bottom Row*/}
        <div>{description}</div>
      </div>
    );
  };
  return <>{renderEditableView()}</>;

  // render edit or widget view based on active state
  // if (active) {
  //   return <>{renderEditView()}</>;
  // } else {
  //   return <>{renderWidgetView()}</>;
  // }
}
