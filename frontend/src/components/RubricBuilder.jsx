import {useState} from "react";

export default function RubricBuilder() {

    const [ratingCount, setRatingCount] = useState();

    const handleRatingCountChange = (event) => {
        console.log(event.target.value)
        setRatingCount(event.target.value);
    };
    return (
        <div className={"h-screen w-screen bg-gray-800 text-white font-sans"}>
            <form className={"grid p-8 w-1/2 g-3"}>
                <h1 className={"font-bold text-3xl mb-4"}>Create a new rubric</h1>

                <label htmlFor="rubricTitle">Rubric Title</label>
                <input type="text"
                       placeholder={"Task: Description"}
                       className={"rounded p-1 mb-2 hover:bg-gray-200"}
                       required
                       name={"rubricTitle"}
                       id={"rubricTitle"}
                />

                <label htmlFor="criteriaOneTitle">Criteria 1</label>
                <input type="text"
                       placeholder={"Criteria Description"}
                       className={"rounded p-1 mb-2 hover:bg-gray-200"}
                       required
                />
                <div>
                    <h2 className={""}># of Rating Options</h2>
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
                    <div className={"grid"}>
                        <label htmlFor="ratingDesc">Rating 1 Description</label>
                        <textarea
                            name="ratingDesc"
                            id="ratingDesc"
                            rows="4"
                            className={"rounded-md text-gray-600 border-2 border-gray-300 hover:bg-gray-200 shadow-sm focus:outline-none"}
                        ></textarea>

                    </div>


                </div>


            </form>
        </div>
    )
}