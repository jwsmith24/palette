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
}
