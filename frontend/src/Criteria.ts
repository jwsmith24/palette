import Rating from "./Rating.ts";

export default class Criteria {
  title: string;
  ratings: Rating[];
  id: string;

  constructor(title = "") {
    this.title = title;
    this.ratings = [
      new Rating(5, "Good explanation provided"),
      new Rating(3, "Partially correct"),
      new Rating(1, "No/Wrong answer provided"),
    ];
    this.id = crypto.randomUUID();
  }

  // ? ensures it's not required in every Criteria object //todo this might cause problems?
  getMaxPoints(): number {
    if (this.ratings.length === 0) {
      return 0; // Handle empty ratings array
    }

    const maxRating = this.ratings.reduce(
      (max, current) => (current.points > max.points ? current : max),
      this.ratings[0],
    );

    return maxRating.points; // Return the maximum points value
  }

  // Method to convert the instance to a JSON object
  toJSON() {
    return {
      title: this.title,
      ratings: this.ratings.map((rating) => rating.toJSON()), // Ensure Rating class has a toJSON method
      id: this.id,
    };
  }
}
