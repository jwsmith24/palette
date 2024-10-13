export default class Rating {
  points: number;
  description: string;
  id: string;
  color: string;

  constructor(points = 0, description = "", color = "") {
    this.points = points;
    this.description = description;
    this.id = crypto.randomUUID();
    this.color = color;
  }
}
