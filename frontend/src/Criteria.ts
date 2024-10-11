import Rating from "./Rating.ts";

export default class Criteria {
  title: string;
  ratings: Rating[];
  id: string;

  constructor(title = "") {
    this.title = title;
    this.ratings = [new Rating()];
    this.id = crypto.randomUUID();
  }
}
