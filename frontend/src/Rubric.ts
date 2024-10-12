import Criteria from "./Criteria";

export default class Rubric {
  title: string;
  criteria: Criteria[];
  id: string;

  constructor(title = "") {
    this.title = title;
    this.criteria = [new Criteria()];
    this.id = crypto.randomUUID();
  }
}
