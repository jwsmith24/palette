// main entry point for backend application

import express, { Response, Request } from "express";

const app = express();
const PORT = 3000;

// test route
app.get("/", (req: Request, res: Response) => {
  res.send("hi from express featuring typescript");
});

// start the server
app.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}`);
});
