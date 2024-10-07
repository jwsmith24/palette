export default function RubricForm() {
  return (
    <div
      className={
        "w-full border border-red-400 grid justify-center items-center"
      }
    >
      <form className={"grid gap-1"}>
        <div
          id={"header"}
          className={
            "border-red-400 border grid grid-flow-col auto-cols-fr gap-4 justify-around"
          }
        >
          <p>Asurite id</p>
          <p>Criterion</p>
          <p>Rating Stars</p>
          <p>Comments</p>
        </div>
        <div>
          <input
            type="text"
            placeholder={"asurite_id1"}
            required
            className={"border border-gray-100 rounded"}
          />
          <input
            type="text"
            placeholder={"asurite_id1"}
            required
            className={"border border-gray-100 rounded"}
          />
          <input
            type="text"
            placeholder={"asurite_id1"}
            required
            className={"border border-gray-100 rounded"}
          />
          <input
            type="text"
            placeholder={"asurite_id1"}
            required
            className={"border border-gray-100 rounded"}
          />
        </div>
        <div>
          <input type="text" />
        </div>
      </form>
    </div>
  );
}
