export default class Rating {
  points: number;
  description: string;
  id: string;

  constructor(points = 0, description = "") {
    this.points = points;
    this.description = description;
    this.id = crypto.randomUUID();
  }
}
