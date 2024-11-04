import express, { NextFunction, Request, Response } from "express";
import rubricRouter from "./routes/rubricRouter.js";
import cors from "cors";
import path from "path";

import dotenv from "dotenv";
import { PaletteAPIResponse, Course } from "palette-types";

// Load environment variables from .env file
export const config = dotenv.config();

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

app.use(cors(corsOptions));
app.use(express.json());
app.use(
  express.static(path.join(import.meta.dirname, "../../../../frontend/dist")),
);

// Logging middleware function
app.use((req, _res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.url}`);
  next();
});

// Health check route
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "HEALTHY" });
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

// Wildcard route for frontend
app.get("*", (req: Request, res: Response) => {
  if (req.originalUrl.startsWith("/api")) {
    res.status(404).send({ error: "API route not found" });
  } else {
    res.sendFile(
      path.join(import.meta.dirname, "../../../../frontend/dist", "index.html"),
    );
  }
});

// Global error-handling middleware
// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is up on http://localhost:${PORT}`);
});
