import Rating from "./Rating.ts";

export default class Criteria {
  title: string;
  ratings: Rating[];
  id: string;

  constructor(title = "") {
    this.title = title;
    this.ratings = [
      new Rating(5, "Good explanation provided", "blue"),
      new Rating(3, "Partially correct", "green"),
      new Rating(0, "No/Wrong answer provided", "red"),
    ];
    this.id = crypto.randomUUID();
  }
}
