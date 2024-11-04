// main entry point for backend application

import express, { NextFunction, Request, Response } from "express";
import rubricRouter from "./routes/rubricRouter.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { StatusCodes } from "http-status-codes";
import { rubricFieldErrorHandler } from "./middleware/rubricFieldErrorHandler.js";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.SERVER_PORT || 3000; // use environment variable, falls back to 3000

// CORS config
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions)); // enable CORS with above configuration
app.use(express.json()); // middleware to parse json requests
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// logging middleware function
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// field validation error handling middleware
app.use(rubricFieldErrorHandler);

// handle all unhandled errors
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res
    .status(StatusCodes.INTERNAL_SERVER_ERROR)
    .json({ error: "Something went wrong!" });
  next();
});

// Health check route
app.get("/health", (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ status: "UP" });
});

// API routes
app.use("/api/rubrics", rubricRouter);

// Wildcard route should only handle frontend routes
// It should not handle any routes under /api or other server-side routes.
app.get("*", (req: Request, res: Response) => {
  // If a developer messes up the api routes, send a 404 error with informative error
  if (req.originalUrl.startsWith("/api")) {
    res.status(StatusCodes.NOT_FOUND).send({ error: "API route not found" });
  } else {
    // If the client tries to navigate to an unknown page, send them the index.html file
    res.sendFile(path.join(__dirname, "../../frontend/dist", "index.html"));
  }
});

// Start the server and listen on port defined in .env file
app.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}`);
});
