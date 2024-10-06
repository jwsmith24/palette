import { useState } from "react";

export default function RubricBuilder() {
  const [ratingCount, setRatingCount] = useState(1);

  const handleRatingCountChange = (event) => {
    console.log(event.target.value);
    setRatingCount(event.target.value);
    renderRatingInputs();
  };

  const renderRatingInputs = () => {
    const inputs = [];
    for (let i = 0; i < ratingCount; i++) {
      inputs.push(
        <div key={i} className={"grid m-2"}>
          <h2 className={"font-bold"}>Rating {i + 1}</h2>
          <label htmlFor={`ratingDesc${i}}`}>Rating Description</label>
          <textarea
            name={`ratingDesc${i}}`}
            id={`ratingDesc${i}}`}
            rows="4"
            placeholder={"Describe the standards to earn the rating."}
            className={
              "rounded-md text-gray-600 border-2 border-gray-300 hover:bg-gray-200 shadow-sm focus:outline-none"
            }
          ></textarea>
        </div>,
      );
    }
    return inputs;
  };
  return (
    <div className={"h-screen w-screen bg-gray-800 text-white font-sans"}>
      <form className={"grid p-8 w-1/2 g-3"}>
        <h1 className={"font-bold text-3xl mb-4"}>Create a new rubric</h1>

        <label htmlFor="rubricTitle">Rubric Title</label>
        <input
          type="text"
          placeholder={"Task: Description"}
          className={"rounded p-1 mb-2 hover:bg-gray-200"}
          required
          name={"rubricTitle"}
          id={"rubricTitle"}
        />

        <label htmlFor="criteriaOneTitle">Criteria 1</label>
        <input
          type="text"
          placeholder={"Criteria Description"}
          className={"rounded p-1 mb-2 hover:bg-gray-200"}
          required
        />
        <div>
          {}
          <h2 className={""}>Rating Options</h2>
          <select
            className={"text-black rounded-b"}
            name="ratingCount"
            id="ratingCount"
            value={ratingCount}
            onChange={handleRatingCountChange}
          >
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
          </select>
          <div>{renderRatingInputs()}</div>
        </div>
      </form>
    </div>
  );
}
