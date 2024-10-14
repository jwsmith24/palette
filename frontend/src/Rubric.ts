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

  // Static method to create Rubric from Prisma data
  static fromPrisma(data: {
    id: number;
    title: string;
    description?: string;
    criteria: string;
    userId: number;
  }): Rubric {
    return new Rubric(
      data.title,
      data.description,
      JSON.parse(data.criteria), // Convert JSON string back to Criteria array
      data.id, // use ID from database
    );
  }
}
