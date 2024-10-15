// main entry point for backend application
import express, { Response, Request } from "express";
import userRouter from "./routes/userRouter.js";
import rubricRouter from "./routes/rubricRouter.js"; // !! required js extension !!
import cors from "cors";

const app = express();
const PORT = 3000;

app.use(cors()); // enable CORS for all routes

// middleware to parse any json requests
app.use(express.json());

// test route
app.get("/", (req: Request, res: Response) => {
  res.send("Hi from the future backend of Palette!!!!!! (via express)");
});

// use the user router for all /users routes
app.use(userRouter);
app.use(rubricRouter);

// start the server
app.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}`);
});
