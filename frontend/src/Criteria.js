class Criteria {
  constructor(title = "", ratingCount = 1) {
    this.title = title;
    this.ratingCount = ratingCount;
    this.ratings = this.initializeRatings(ratingCount);
  }

  initializeRatings(ratingCount) {
    const ratingsArray = [];
    // Create ratingCount number of ratings
    for (let i = 0; i < ratingCount; i++) {
      ratingsArray.push({
        points: 0,
        description: "",
      });
    }
    // Return the array of rating objects
    return ratingsArray;
  }
}
