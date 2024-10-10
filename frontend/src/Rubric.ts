import Criteria from "./Criteria";

export default class Rubric {
  title: string;
  criteria: Criteria[];

  constructor(title = "") {
    this.title = title;
    this.criteria = [];
  }

  addCriterion(criteria: Criteria): void {
    this.criteria.push(criteria);
  }

  removeCriterion(index: number): void {
    if (index >= 0 && index < this.criteria.length) {
      this.criteria.splice(index, 1);
    }
  }

  updateCriterion(index: number, newCriteria: Criteria): void {
    if (index >= 0 && index < this.criteria.length) {
      this.criteria[index] = newCriteria;
    }
  }

  getCriterion(index: number): Criteria {
    return this.criteria[index];
  }

  toJSON() {
    return {
      title: this.title,
      criteria: this.criteria.map((criteria) => ({
        title: criteria.title,
        ratings: criteria.ratings,
      })),
    };
  }
}
