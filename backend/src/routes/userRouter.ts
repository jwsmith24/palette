// Router for all /user requests
import express, { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const router = express.Router();
const prisma = new PrismaClient();

// route to create a new user
router.post("/users", async (req: Request, res: Response) => {
  const { email, name } = req.body;

  try {
    const newUser = await prisma.user.create({
      data: {
        email,
        name,
      },
    });
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ error: `Failed to create new user: ${name}` });
  }
});

router.get("/users", async (req: Request, res: Response) => {
  try {
    const users = await prisma.user.findMany(); // fetch all users
    res.json(users); // return the users as json
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve all users" });
  }
});

export default router;
