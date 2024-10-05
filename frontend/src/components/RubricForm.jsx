
export default function RubricForm() {


    return (
        <form className={"w-full"}>
            <div className={"flex flex-row w-full justify-between items-center"}>
                {/* Asurite Block Input */}
                <div className={"flex-1 mr-4"}>
                    <label htmlFor="asurite" className={"bg-black"}>Asurite:</label>
                    <input
                        type="text"
                        id="asurite"
                        name="asurite"
                        className={"w-full border border-violet-300 p-2"}
                        placeholder="Enter Asurite"
                    />
                </div>

                {/* Column 1 (c1) Input */}
                <div className={"flex-1 mr-4"}>
                    <label htmlFor="c1">C1:</label>
                    <input
                        type="text"
                        id="c1"
                        name="c1"
                        className={"w-full border border-gray-300 p-2"}
                        placeholder="C1"
                    />
                </div>

                {/* Column 2 (c2) Input */}
                <div className={"flex-1 mr-4"}>
                    <label htmlFor="c2">C2:</label>
                    <input
                        type="text"
                        id="c2"
                        name="c2"
                        className={"w-full border border-gray-300 p-2"}
                        placeholder="C2"
                    />
                </div>

                {/* Comments Input */}
                <div className={"flex-1"}>
                    <label htmlFor="comments">Comments:</label>
                    <textarea
                        id="comments"
                        name="comments"
                        className={"w-full border border-gray-300 p-2"}
                        placeholder="Add comments"
                    />
                </div>
            </div>
        </form>

    )
}