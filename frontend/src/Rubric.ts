import Criteria from "./Criteria";

export default class Rubric {
  title: string;
  description?: string;
  criteria: Criteria[];
  id?: number;

  // update Criteria constructor to be compatible with importing prisma model
  constructor(
    title = "",
    description = "",
    criteria: Criteria[] = [],
    id?: number,
  ) {
    this.title = title;
    this.criteria = [new Criteria()];
    this.id = id; // use db-managed unique IDs
    this.description = "";
  }
}
