export default class Criteria {
  title: string;
  ratingCount: number;
  ratings;
  editView: boolean; // used to toggle widget vs edit view

  constructor(title = "", ratingCount = 1) {
    this.title = title;
    this.ratingCount = ratingCount;
    this.ratings = this.initializeRatings(ratingCount);
    this.editView = true;
  }

  // builds the array of rating options for a given Criteria object
  initializeRatings(ratingCount: number) {
    const ratingsArray = [];
    for (let i = 0; i < ratingCount; i++) {
      ratingsArray.push({
        points: 0,
        description: "",
      });
    }

    return ratingsArray;
  }

  setRatingCount(count: number) {
    this.ratingCount = count;
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
