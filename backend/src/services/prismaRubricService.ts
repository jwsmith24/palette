import { PrismaClient } from '@prisma/client';
import { RubricService } from './rubricService';
import { Rubric, RubricCriterion, RubricRating } from '../routes/rubricRouter';

/**
 * This class is responsible for handling all the business logic for rubrics.
 * This includes creating, updating, deleting, and retrieving rubrics from the database.
 */
export default class PrismaRubricService implements RubricService {
  private prisma = new PrismaClient();

  async createRubric(rubric: Rubric): Promise<Rubric | null> {
    const createdRubric = this.prisma.rubric.create({
      data: {
        title: rubric.title,
        rubricCriteria: {
          // get the criteria (if any)
          create: rubric.rubricCriteria?.map((criterion) => ({
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
    });

    if (!createdRubric) {
      return null;
    }
    return this.toRubricDTO(createdRubric);
  }

  async getRubricById(id: number): Promise<Rubric | null> {
    const rubric = this.prisma.rubric.findUnique({
      where: { id },
      include: {
        rubricCriteria: {
          include: {
            ratings: true,
          },
        },
      },
    })

    // if rubric is null, return null, else return the mapped rubric
    return rubric ? this.toRubricDTO(rubric) : null;
  }

  async getAllRubrics(): Promise<Rubric[]> {
    // return this.prisma.rubric.findMany({
    //   include: {
    //     rubricCriteria: {
    //       include: {
    //         ratings: true,
    //       },
    //     },
    //   },
    // }) as Rubric[];
    throw new Error("Method not implemented.");
  }

  async updateRubric(id: number, data: Rubric): Promise<void> {
    await this.prisma.rubric.update({
      where: { id: Number(id) },
      data: {
        title: data.title,
        pointsPossible: data.pointsPossible,
        rubricCriteria: {
          // update the criteria, if any
          create: data.rubricCriteria?.map((criterion: RubricCriterion) => ({
            description: criterion.description,
            longDescription: criterion.longDescription,
            points: criterion.points,
            ratings: {
              create: criterion.ratings.map((rating: RubricRating) => ({
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
  }

  async deleteAllCriteria(rubricId: number): Promise<void> {
    await this.prisma.rubricCriterion.deleteMany({
      where: { rubricId },
    });
  }

  async deleteRubric(id: number): Promise<void> {
    await this.prisma.rubric.delete({
      where: { id },
    });
  }

  async getRubricIdByTitle(title: string): Promise<{ id: number } | null> {
    return this.prisma.rubric.findFirst({
      where: { title },
      select: { id: true },
    });
  }

  private toRubricDTO(rubric: any): Rubric {
    return {
      id: rubric.id,
      title: rubric.title,
      pointsPossible: rubric.pointsPossible,
      rubricCriteria: rubric.rubricCriteria.map((criterion: any) => ({
        description: criterion.description,
        longDescription: criterion.longDescription,
        points: criterion.points,
        ratings: criterion.ratings.map((rating: any) => ({
          description: rating.description,
          longDescription: rating.longDescription,
          points: rating.points,
        })),
      })),
    };
  }
}
