// Router for all /rubrics requests
import express, { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

router.post("/rubrics", async (req: Request, res: Response) => {
  const { title, rubricCriteria } = req.body;

  try {
    const newRubric = await prisma.rubric.create({
      data: {
        title,
        rubricCriteria: {
          // creates the criterion objects in the database and defines the relationships in the same transaction
          create: rubricCriteria,
        },
      },
    });
    res.status(201).json(newRubric);
  } catch (error) {
    res.status(500).json({ error: "Failed to create new rubric" });
    console.log(error);
  }
});

// fetch all rubrics from the database
router.get("/rubrics", async (req: Request, res: Response) => {
  console.log("got", req.body);

  try {
    const rubrics = await prisma.rubric.findMany(); // gets all rubrics
    res.status(200).json(rubrics); // Send list of all rubrics
  } catch (error) {
    res.status(500).json({ error: "Failed to get rubrics." });
    console.log(error);
  }
});

export default router;
