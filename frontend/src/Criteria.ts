import Rating from "./Rating.ts";

export default class Criteria {
  title: string;
  ratings: Rating[];
  editView: boolean; // used to toggle widget vs edit view

  constructor(title = "") {
    this.title = title;
    this.ratings = [new Rating()];
    this.editView = true;
  }

  // saves new ratings array
  setRatings(ratings: Rating[]) {
    this.ratings = ratings;
  }

  setTitle(title: string) {
    this.title = title;
  }

  // determines if the criteria is rendered in edit or widget view on the UI.
  toggleEditView(): void {
    this.editView = !this.editView;
  }

  calculatePoints(): number {
    return this.ratings.reduce(
      (counter, currentValue) => counter + currentValue.points,
      0,
    );
  }
}
