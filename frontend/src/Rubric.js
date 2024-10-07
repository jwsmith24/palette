export default class Rubric {
  constructor(title = "") {
    this.title = title;
    this.criteria = [];
    console.log(this);
  }

  setTitle(title) {
    this.title = title;
  }

  addCriterion(criteria) {
    this.criteria.push(criteria);
  }

  removeCriterion(index) {
    if (index >= 0 && index < this.criteria.length) {
      this.criteria.splice(index, 1);
    }
  }

  updateCriterion(index, newCriteria) {
    if (index >= 0 && index < this.criteria.length) {
      this.criteria[index] = newCriteria;
    }
  }

  getCriterion(index) {
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
