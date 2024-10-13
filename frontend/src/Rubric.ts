import Criteria from "./Criteria";

export default class Rubric {
  title: string;
  criteria: Criteria[];
  id: string;

  constructor(title = "") {
    this.title = title;
    this.criteria = [new Criteria("2.3.4 Deliverable Answer")];
    this.id = crypto.randomUUID();
  }

  // Method to convert the instance to a JSON object
  toJSON() {
    return {
      title: this.title,
      criteria: this.criteria.map((criterion) => criterion.toJSON()), // Ensure Criteria class has a toJSON method
      id: this.id,
    };
  }
}
