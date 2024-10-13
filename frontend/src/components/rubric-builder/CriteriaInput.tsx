/* CriteriaInput.tsx
React component where the user can add/edit information for a given criterion. Displayed when a criterion is in
 "edit" view. (The CriteriaWidget component is rendered when a criterion is in "widget" view)
 */
import React, {
  ChangeEvent,
  MouseEvent as ReactMouseEvent,
  ReactElement,
  useState,
} from "react";
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
  const [ratings, setRatings] = useState<Rating[]>(criterion.ratings);

  const handleAddCriteriaButton = (event: ReactMouseEvent) => {
    event.preventDefault();
    handleAddCriteria();
  };

  const handleRemoveCriteriaButton = (
    event: ReactMouseEvent,
    index: number,
  ) => {
    event.preventDefault();
    removeCriterion(index);
  };

  // implements Partial which allows the Rating properties to be temporarily optional
  const handleRatingChange = (
    ratingIndex: number,
    updatedRating: Partial<Rating>,
  ) => {
    const updatedRatings = ratings.map((rating, index) =>
      index === ratingIndex ? { ...rating, ...updatedRating } : rating,
    );
    setRatings(updatedRatings);
    const updatedCriterion = { ...criterion, ratings: updatedRatings };
    handleCriteriaUpdate(index, updatedCriterion);
  };

  // renders number of buttons == number of ratings in the array. uses their set color
  const renderRatingOptions = () => {
    return criterion.ratings.map((rating: Rating, index: number) => {
      return (
        <div key={rating.id} className="flex gap-2">
          <input
            type="number"
            value={rating.points}
            onChange={(event) => {
              event.preventDefault();
              handleRatingChange(index, { points: Number(event.target.value) });
            }}
            className={`transition-all ease-in-out duration-300 font-bold rounded-lg px-2 py-1 text-black border w-10`}
            min="0"
            required
          />
          <input
            type="text"
            className={"rounded p-2 text-gray-500 w-full"}
            placeholder={rating.description || "Enter rating description..."}
            onChange={(event) => {
              event.preventDefault();
              handleRatingChange(index, { description: event.target.value });
            }}
          />
          {/*ensure remove button is not tabbable*/}
          <button
            className={
              "bg-gray-200 text-black px-2 py-1 rounded opacity-20 hover:bg-red-500 hover:opacity-100 hover:text-white"
            }
            tabIndex={-1}
          >
            -
          </button>
        </div>
      );
    });
  };

  const renderEditableView = () => {
    return (
      // Criterion widget
      <div className="grid grid-rows-[auto,auto] border border-white p-4 gap-4 rounded-md w-full">
        {/* Input Row */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <div className={"grid self-baseline"}>
            <input
              type="text"
              placeholder={`Criteria ${index + 1} Title...`}
              className={"rounded p-2 text-gray-500 w-full"}
            />
            <p>Max Points</p>
          </div>

          <div className="grid gap-2">{renderRatingOptions()}</div>
          <div className={"flex gap-3 justify-self-start"}>
            <button onClick={handleAddCriteriaButton}>Add</button>
            <button
              onClick={(event: ReactMouseEvent<HTMLButtonElement>) =>
                handleRemoveCriteriaButton(event, index)
              }
            >
              Remove
            </button>
          </div>

          <button>add rating option</button>
        </div>
      </div>
    );
  };
  return <>{renderEditableView()}</>;
}
