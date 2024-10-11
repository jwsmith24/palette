import Rating from "./Rating.ts";

export default class Criteria {
  title: string;
  ratings: Rating[];
  id: string;
  editView: boolean; // used to toggle widget vs edit view

  constructor(title = "") {
    this.title = title;
    this.ratings = [new Rating()];
    this.id = crypto.randomUUID();
    this.editView = true;
  }
}
