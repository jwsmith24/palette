// main entry point for backend application

import express, { Request, Response } from "express";
import rubricRouter from "./routes/rubricRouter.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { StatusCodes } from "http-status-codes";
import { rubricFieldErrorHandler } from "./middleware/rubricFieldErrorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { responseLogger } from "./middleware/responseLogger.js";
import { fallbackErrorHandler } from "./middleware/fallbackErrorHandler.js";

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

// Request logging
app.use(requestLogger);

// Response logging
app.use(responseLogger);

// API routes
app.use("/api/rubrics", rubricRouter);

// Health check route
app.get("/health", (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ status: "UP" });
});

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

// field validation error handling middleware
app.use(rubricFieldErrorHandler);

// handle all unhandled errors
app.use(fallbackErrorHandler);

// Start the server and listen on port defined in .env file
app.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}`);
});
