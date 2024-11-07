import { PrismaClient } from "@prisma/client";
import { TemplateService } from "./templateRequests";
import { Template, Criteria, Rating } from "palette-types";
import util from "util";

/**
 * This class is responsible for handling all the business logic for rubrics.
 * This includes creating, updating, deleting, and retrieving rubrics from the database.
 */
export default class PrismaTemplateService implements TemplateService {
  private prisma = new PrismaClient();

  async createTemplate(template: Template): Promise<Template | null> {
    const createdRubric = await this.prisma.template.create({
      data: {
        title: template.title,
        pointsPossible: template.points,
        rubricCriteria: {
          create: template.criteria.map((criterion) => ({
            description: criterion.description,
            longDescription: criterion.longDescription,
            points: criterion.points,
            ratings: {
              create: criterion.ratings.map((rating) => ({
                description: rating.description,
                longDescription: rating.longDescription,
                points: rating.points,
              })),
            },
          })),
        },
      },
      include: {
        rubricCriteria: {
          include: {
            ratings: true,
          },
        },
      },
    });

    // log the rubric (printing 4 nested objects deep)
    console.log(
      "Created rubric:",
      util.inspect(createdRubric, { depth: 4, colors: true })
    );
    return (createdRubric as Template) || null;
  }

  async getTemplateById(id: number): Promise<Template | null> {
    const returnedRubric = await this.prisma.rubric.findUnique({
      where: { id },
      include: {
        rubricCriteria: {
          include: {
            ratings: true,
          },
        },
      },
    });

    // log the rubric (printing 4 nested objects deep)
    console.log(
      "Retrieved rubric:",
      util.inspect(returnedRubric, { depth: 4, colors: true })
    );
    return returnedRubric as Template | null;
  }

  async getAllTemplates(): Promise<Template[]> {
    const fetchedRubrics = await this.prisma.rubric.findMany({
      include: {
        rubricCriteria: {
          include: {
            ratings: true,
          },
        },
      },
    });

    // log the rubrics (printing 4 nested objects deep)
    console.log(
      "Fetched rubrics:",
      util.inspect(fetchedRubrics, { depth: 4, colors: true })
    );
    return fetchedRubrics as Template[];
  }

  async updateTemplate(id: number, data: Template): Promise<Template | null> {
    // delete the rubrics criterion first
    await this.deleteAllCriteria(id);

    const updatedRubric = await this.prisma.rubric.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        pointsPossible: data.pointsPossible,
        rubricCriteria: {
          // update the criteria, if any
          create: data.criteria?.map((criterion: Criteria) => ({
            description: criterion.description,
            longDescription: criterion.longDescription,
            points: criterion.points,
            ratings: {
              create: criterion.ratings.map((rating: Rating) => ({
                description: rating.description,
                longDescription: rating.longDescription,
                points: rating.points,
              })),
            },
          })),
        },
      },
      include: {
        rubricCriteria: {
          include: {
            ratings: true,
          },
        },
      },
    });

    // log the updated rubric (printing 4 nested objects deep)
    console.log(
      "Updated rubric:",
      util.inspect(updatedRubric, { depth: 4, colors: true })
    );
    return updatedRubric as Template | null;
  }

  async deleteAllCriteria(rubricId: number): Promise<void> {
    await this.prisma.rubricCriterion.deleteMany({
      where: { rubricId },
    });
    console.log("Deleted all criteria for rubric ID:", rubricId);
  }

  async deleteTemplate(id: number): Promise<void> {
    await this.prisma.rubric.delete({
      where: { id },
    });
    console.log("Deleted rubric with ID:", id);
  }

  async getTemplateIdByTitle(title: string): Promise<{ id: number } | null> {
    const rubricId = await this.prisma.rubric.findFirst({
      where: { title },
      select: { id: true },
    });

    if (rubricId) {
      console.log("Found rubric with ID:", rubricId);
      return rubricId as { id: number };
    }

    console.log("Rubric not found with title:", title);
    return null;
  }
}
