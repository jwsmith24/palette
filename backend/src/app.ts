// main entry point for backend application

import express, { Response, Request } from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const PORT = 3000;

// test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hi from the future backend of Palette!!!!!! (via express)");
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}`);
});
