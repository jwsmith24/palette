// Router for all /rubrics requests
import express, { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/rubrics", async (req: Request, res: Response) => {
  const { title, description, criteria } = req.body;

  try {
    const newRubric = await prisma.rubric.create({
      // @ts-ignore
      data: {
        title,
        description,
        criteria,
      },
    });
    res.status(201).json(newRubric);
  } catch (error) {
    res.status(500).json({ error: "Failed to create new rubric" });
    console.log(error);
  }
});

router.get("/rubrics", async (req: Request, res: Response) => {
  res.status(200).json({
    message: "nice! you've hit the rubrics endpoint of the backend!",
  });
});

export default router;
