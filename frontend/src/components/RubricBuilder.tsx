import {ChangeEvent, MouseEvent as ReactMouseEvent, ReactElement, useState,} from "react";
import Rubric from "../Rubric";
import Criteria from "../Criteria";

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

            <div className="mt-4">
                {renderRatingInputs(criterion.ratingCount, index)}
            </div>
        </div>
    );

    const renderRatingInputs = (ratingCount: number, criteriaIndex: number) => {
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
                        rows={4}
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
                    className="rounded p-1 mb-2 hover:bg-gray-200 focus:outline-0 text-gray-600"
                    name="rubricTitle"
                    id="rubricTitle"
                    value={rubric.title}
                    onChange={handleRubricTitleChange}
                />

                <div className="mt-4">
                    {rubric.criteria.map((criterion: Criteria, index: number) =>
                        renderCriteriaInput(criterion, index),
                    )}
                </div>
                <button
                    className="justify-self-end bg-orange-500 rounded-md px-2 font-bold hover:opacity-80 active:opacity-70"
                    onClick={addCriteria}
                >
                    Add Criteria
                </button>
            </form>
        </div>
    );
}
