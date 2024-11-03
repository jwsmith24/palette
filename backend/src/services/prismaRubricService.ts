import { PrismaClient } from "@prisma/client";
import { RubricService } from "./rubricService";
import {
  PrismaRubric,
  PrismaRubricCriterion,
  PrismaRubricRating,
} from "../../../palette-types/src/DatabaseSafeTypes";
import util from "util";

/**
 * This class is responsible for handling all the business logic for rubrics.
 * This includes creating, updating, deleting, and retrieving rubrics from the database.
 */
export default class PrismaRubricService implements RubricService {
  private prisma = new PrismaClient();

  async createRubric(rubric: PrismaRubric): Promise<PrismaRubric | null> {
    const createdRubric = await this.prisma.rubric.create({
      data: {
        title: rubric.title,
        pointsPossible: rubric.pointsPossible,
        rubricCriteria: {
          create: rubric.rubricCriteria.map((criterion) => ({
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
      util.inspect(createdRubric, { depth: 4, colors: true }),
    );
    return (createdRubric as PrismaRubric) || null;
  }

  async getRubricById(id: number): Promise<PrismaRubric | null> {
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
      util.inspect(returnedRubric, { depth: 4, colors: true }),
    );
    return returnedRubric as PrismaRubric | null;
  }

  async getAllRubrics(): Promise<PrismaRubric[]> {
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
      util.inspect(fetchedRubrics, { depth: 4, colors: true }),
    );
    return fetchedRubrics as PrismaRubric[];
  }

  async updateRubric(
    id: number,
    data: PrismaRubric,
  ): Promise<PrismaRubric | null> {
    // delete the rubrics criterion first
    await this.deleteAllCriteria(id);

    const updatedRubric = await this.prisma.rubric.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        pointsPossible: data.pointsPossible,
        rubricCriteria: {
          // update the criteria, if any
          create: data.rubricCriteria?.map(
            (criterion: PrismaRubricCriterion) => ({
              description: criterion.description,
              longDescription: criterion.longDescription,
              points: criterion.points,
              ratings: {
                create: criterion.ratings.map((rating: PrismaRubricRating) => ({
                  description: rating.description,
                  longDescription: rating.longDescription,
                  points: rating.points,
                })),
              },
            }),
          ),
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
      util.inspect(updatedRubric, { depth: 4, colors: true }),
    );
    return updatedRubric as PrismaRubric | null;
  }

  async deleteAllCriteria(rubricId: number): Promise<void> {
    await this.prisma.rubricCriterion.deleteMany({
      where: { rubricId },
    });
    console.log("Deleted all criteria for rubric ID:", rubricId);
  }

  async deleteRubric(id: number): Promise<void> {
    await this.prisma.rubric.delete({
      where: { id },
    });
    console.log("Deleted rubric with ID:", id);
  }

  async getRubricIdByTitle(title: string): Promise<{ id: number } | null> {
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
