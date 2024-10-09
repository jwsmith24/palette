import { ReactElement } from "react";

interface RatingProps {
  ratingCount: number;
  criteriaIndex: number;
}
export default function RatingInput({
  ratingCount,
  criteriaIndex,
}: RatingProps): ReactElement {
  const inputs = []; // have to return elements in an array because the count is dynamic
  for (let i = 0; i < ratingCount; i++) {
    inputs.push(
      <div key={i} className="grid rounded gap-2">
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
          rows={2}
          placeholder="Describe the standards to earn this rating."
          className="rounded-md text-gray-600 border-2 border-gray-300 hover:bg-gray-200 shadow-sm focus:outline-none"
        ></textarea>
      </div>,
    );
  }
  return <>{inputs}</>;
}
