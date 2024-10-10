export default class Rating {
  points: number;
  description: string;

  constructor(points = 0, description = "") {
    this.points = points;
    this.description = description;
  }

  setPoints(points: number) {
    this.points = points;
  }

  setDescription(description: string) {
    this.description = description;
  }
}
