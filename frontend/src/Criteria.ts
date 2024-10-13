import Rating from "./Rating.ts";

export default class Criteria {
  title: string;
  ratings: Rating[];
  id: string;
  editable: true;

  constructor(title = "") {
    this.title = title;
    this.ratings = [
      new Rating(5, "Good explanation provided"),
      new Rating(3, "Partially correct"),
      new Rating(1, "No/Wrong answer provided"),
    ];
    this.editable = true;
    this.id = crypto.randomUUID();
  }
}
