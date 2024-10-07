import { useState } from "react";
import Rubric from "../Rubric";
import Criteria from "../Criteria";

export default function RubricBuilder() {
  const [rubric, setRubric] = useState(new Rubric("Test"));

  const handleRubricTitleChange = (event) => {
    const newRubric = { ...rubric };
    newRubric.setTitle(event.target.value);
    setRubric(newRubric);
    console.log(rubric);
  };

  const addCriteria = (event) => {
    event.preventDefault();
    const newCriteria = new Criteria();
    const newRubric = { ...rubric };
    newRubric.addCriterion(newCriteria);
    setRubric(newRubric);
  };

  const handleCriteriaTitleChange = (event, index) => {
    const newRubric = { ...rubric };
    const criteria = newRubric.getCriterion(index);
    criteria.setTitle(event.target.value);
    newRubric.updateCriterion(index, criteria);
    setRubric(newRubric);
  };

  // Function to handle changes in the number of rating options for a specific criterion
  const handleRatingCountChange = (event, index) => {
    const newRatingCount = Number(event.target.value);
    const newRubric = { ...rubric };
    const criteria = newRubric.getCriterion(index);
    criteria.setRatingCount(newRatingCount);
    newRubric.updateCriterion(index, criteria);
    setRubric(newRubric);
  };

  // Function to render criteria inputs dynamically
  const renderCriteriaInput = (criterion, index) => (
    <div key={index} className="border p-4 mb-4">
      <label htmlFor={`criteria${index}Title`}>Criteria {index + 1}</label>
      <input
        name={`criteria${index}Title`}
        id={`criteria${index}Title`}
        type="text"
        placeholder="Criteria Description"
        className="rounded p-1 mb-2 hover:bg-gray-200"
        value={criterion.title}
        onChange={(event) => handleCriteriaTitleChange(event, index)}
        required
      />

      <div className="mt-2">
        <h2 className="font-bold">Number of Rating Options</h2>
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

      <div className="mt-4">{renderRatingInputs(criterion, index)}</div>
    </div>
  );

  // Function to render rating inputs dynamically based on the count
  const renderRatingInputs = (ratingCount, criteriaIndex) => {
    const inputs = [];
    for (let i = 0; i < ratingCount; i++) {
      inputs.push(
        <div key={i} className="grid rounded">
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
          value={rubric.title}
          onChange={handleRubricTitleChange}
        />

        <button
          className="justify-self-start bg-orange-500 rounded-md px-2 font-bold hover:opacity-80 active:opacity-70"
          onClick={addCriteria}
        >
          Add Criteria
        </button>

        <div className="mt-4">
          {rubric.criteria.map((criterion, index) =>
            renderCriteriaInput(criterion, index),
          )}
        </div>
      </form>
    </div>
  );
}
