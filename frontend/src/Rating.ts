export default class Rating {
  points: number;
  description: string;
  id: string;

  constructor(points = 0, description = "") {
    this.points = points;
    this.description = description;
    this.id = crypto.randomUUID();
  }
  // Method to convert the instance to a JSON object
  toJSON() {
    return {
      points: this.points,
      description: this.description,
      id: this.id,
    };
  }
}
