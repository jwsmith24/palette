import { useState } from "react";

export default function RubricBuilder() {
  const [criteria, setCriteria] = useState([]); // Array to hold criteria with rating counts

  // Increment criteria count and add a new criterion with default ratingCount = 1
  const incrementCriteriaCount = (event) => {
    event.preventDefault();
    setCriteria([...criteria, { ratingCount: 1 }]); // Add a new criterion with 1 rating option
  };

  // Function to handle changes in the number of rating options for a specific criterion
  const handleRatingCountChange = (event, index) => {
    const newRatingCount = Number(event.target.value);
    const updatedCriteria = [...criteria];
    updatedCriteria[index].ratingCount = newRatingCount;
    setCriteria(updatedCriteria); // Update the criteria array with new rating count
  };

  // Function to render criteria inputs dynamically
  const renderCriteriaInput = (criterion, index) => (
    <div key={index} className="border p-4 mb-4">
      <div className={"grid"}>
        <label htmlFor={`criteria${index}Title`}>Criteria {index + 1}</label>
        <textarea
          name={`criteria${index}Title`}
          id={`criteria${index}Title`}
          placeholder="Criteria Description"
          className="rounded p-1 mb-2 hover:bg-gray-200"
          required
          rows={4}
        />
      </div>

      {/* Dropdown to select the number of rating options */}
      <div className="mt-2 flex content-between gap-4">
        <h2>Number of Rating Options</h2>
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

      {/* Render the rating input fields based on the selected rating count */}
      <div className="mt-4">
        {renderRatingInputs(criterion.ratingCount, index)}
      </div>
    </div>
  );

  // Function to render rating inputs dynamically based on the count
  const renderRatingInputs = (ratingCount, criteriaIndex) => {
    const inputs = [];
    for (let i = 0; i < ratingCount; i++) {
      inputs.push(
        <div key={i} className="grid m-2 rounded">
          <h3>Rating Option {i + 1}</h3>
          <label htmlFor={`points${criteriaIndex}-${i}`}>Points</label>
          <input
            type="number"
            name={`points${criteriaIndex}-${i}`}
            id={`points${criteriaIndex}-${i}`}
            className="w-1/6 text-gray-600 rounded focus:outline-0"
            defaultValue={1}
            min={0}
            max={100}
          />
          <label htmlFor={`ratingDesc${criteriaIndex}-${i}`}>
            Rating Description
          </label>
          <textarea
            name={`ratingDesc${criteriaIndex}-${i}`}
            id={`ratingDesc${criteriaIndex}-${i}`}
            rows="4"
            placeholder="Describe the standards to earn this rating."
            className="rounded-md text-gray-600 border-2 border-gray-300 hover:bg-gray-200 shadow-sm focus:outline-none"
          ></textarea>
        </div>,
      );
    }
    return inputs;
  };

  return (
    <div className="h-max min-h-dvh w-dvw bg-gray-800 text-white font-sans">
      <form className="grid p-8 w-1/2 g-3">
        <h1 className="font-bold text-3xl mb-4">Create a new rubric</h1>

        <label htmlFor="rubricTitle">Rubric Title</label>
        <input
          type="text"
          placeholder="Task: Description"
          className="rounded p-1 mb-2 hover:bg-gray-200 focus:outline-0"
          name="rubricTitle"
          id="rubricTitle"
        />

        {/* Button to add new criteria */}
        <button
          className="justify-self-start bg-orange-500 rounded-md px-2 font-bold hover:opacity-80 active:opacity-70"
          onClick={incrementCriteriaCount}
        >
          Add Criteria
        </button>

        {/* Render criteria inputs dynamically */}
        <div className="mt-4">
          {criteria.map((criterion, index) =>
            renderCriteriaInput(criterion, index),
          )}
        </div>
      </form>
    </div>
  );
}
