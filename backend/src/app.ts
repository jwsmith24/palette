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
const PORT = process.env.SERVER_PORT || 3000;

// CORS config
const corsOptions = {
  origin: "*",
  methods: ["GET", "POST", "PUT", "DELETE"],
};

// Dummy course data
const courses: Course[] = [
  {
    id: 1,
    name: "Introduction to Computer Science",
    description:
      "An introductory course on the fundamentals of computer science.",
    credits: 3,
    key: "CS101",
  },
  {
    id: 2,
    name: "Data Structures and Algorithms",
    description:
      "Learn about data structures, algorithms, and their applications.",
    credits: 4,
    key: "CS201",
  },
  {
    id: 3,
    name: "Web Development Basics",
    description:
      "A beginner-friendly course on front-end and back-end web development.",
    credits: 3,
    key: "WD101",
  },
  {
    id: 4,
    name: "Database Management Systems",
    description:
      "Explore relational databases, SQL, and database design principles.",
    credits: 3,
    key: "DB301",
  },
  {
    id: 5,
    name: "Machine Learning Fundamentals",
    description: "An introductory course to the concepts of machine learning.",
    credits: 4,
    key: "ML101",
  },
];
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
app.get("/api/courses", (_req: Request, res: Response) => {
  const apiResponse: PaletteAPIResponse<Course[]> = {
    data: courses,
    success: true,
    message: "Here are the courses",
  };

  res.json(apiResponse);
});

// API routes
app.use("/api/rubrics", rubricRouter);

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
