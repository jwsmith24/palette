// Router for all /rubrics requests
import express, { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

//todo: define rubrics routes after building model in prisma

router.post("/rubrics", async (req: Request, res: Response) => {
  const { id, title, description, criteria, userId } = req.body;
  try {
    const newRubric = await prisma.rubric.create({
      data: {
        id,
        title,
        description,
        criteria,
        userId,
      },
    });
    res.status(201).json(newRubric);
  } catch (error) {
    res.status(500).json({ error: "Failed to create new rubric" });
  }
});
