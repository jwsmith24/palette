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
import { Course, PaletteAPIResponse } from "palette-types";
import { CoursesAPI } from "./canvasAPI/courseRequests.js";
import dotenv from "dotenv";

// Get the directory name
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config(); // load env variables
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
// Request logging
app.use(requestLogger);

// Response logging
app.use(responseLogger);
// Health check route
app.get("/health", (_req: Request, res: Response) => {
  res.status(StatusCodes.OK).json({ status: "HEALTHY" });
});

// Courses endpoint (test)
app.get("/api/courses", async (_req: Request, res: Response) => {
  try {
    const courses = await CoursesAPI.getCourses();

    const apiResponse: PaletteAPIResponse<Course[]> = {
      data: courses,
      success: true,
      message: "Here are the courses",
    };

    res.json(apiResponse);
  } catch (error) {
    // Handle any potential errors from getCourses()
    const errorResponse: PaletteAPIResponse<null> = {
      success: false,
      message: "Failed to retrieve courses",
      error: error instanceof Error ? error.message : String(error),
    };

    res.status(500).json(errorResponse);
  }
});

// API routes
app.use("/api/rubrics", rubricRouter);
//app.use("/api/templates", templateRouter); avoid errors from template router

// Wildcard route should only handle frontend routes
// It should not handle any routes under /api or other server-side routes.
app.get("*", (req: Request, res: Response) => {
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
  console.log(`Server is up on http://localhost:${PORT}`);
});
