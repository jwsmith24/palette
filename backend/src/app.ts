import express, { Request, Response } from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import { StatusCodes } from "http-status-codes";
import { rubricValidationErrorHandler } from "./middleware/rubricValidationErrorHandler.js";
import { requestLogger } from "./middleware/requestLogger.js";
import { responseLogger } from "./middleware/responseLogger.js";
import { fallbackErrorHandler } from "./middleware/fallbackErrorHandler.js";
import { wildcardRouter } from "./routes/wildcardRouter.js";
import courseRouter from "./routes/courseRouter.js";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.SERVER_PORT || 3000;

// CORS config
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

app.use(cors(corsOptions)); // enable CORS with above configuration
app.use(express.json()); // middleware to parse json requests
app.use(express.static(path.join(__dirname, "../../frontend/dist")));

// Logging middleware (goes before routes)
app.use(requestLogger);
app.use(responseLogger);

// Health check route
app.get("/health", (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ status: "HEALTHY" });
});

// API routes
app.use("/api/courses", courseRouter);
app.get("*", wildcardRouter);

// field validation error handling middleware
app.use(rubricValidationErrorHandler);

// handle all unhandled errors
app.use(fallbackErrorHandler);

// Start the server and listen on port defined in .env file
app.listen(PORT, () => {
  console.log(`Server is up on http://localhost:${PORT}`);
});
