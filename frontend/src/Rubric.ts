import Criteria from "./Criteria";

export default class Rubric {
  title: string;
  description?: string;
  criteria: Criteria[];
  id?: number;

  constructor(
    title = "",
    description = "",
    criteria: Criteria[] = [],
    id?: number,
  ) {
    this.title = title;

    if (!criteria) {
      this.criteria = [new Criteria()]; // adds new criteria array if empty
    } else {
      this.criteria = criteria;
    }
    this.id = id; // use db-managed unique IDs
    this.description = description;
  }
}
