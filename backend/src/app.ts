// main entry point for backend application

import express, { NextFunction, Request, Response } from "express";
import rubricRouter from "./routes/rubricRouter.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import { PaletteAPIResponse, Course } from "palette-types";
import asyncHandler from "express-async-handler";

// Load environment variables from .env file
export const config = dotenv.config();

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

// Dummy course data
const courses = [
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

// logging middleware function
app.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

// Health check route
app.get("/health", (_req: Request, res: Response) => {
  res.status(200).json({ status: "UP" });
});

// test endpoint for grading
app.get(
  "/api/courses",
  asyncHandler((req: Request, res: Response) => {
    console.log("Sending course data: ", courses);
    const apiResponse: PaletteAPIResponse<Course[]> = {
      data: courses,
      success: true,
      message: "here are the courses",
    };

    res.json(apiResponse);
  }),
);

// API routes
app.use("/api/rubrics", rubricRouter);

//Wildcard route should only handle frontend routes
//It should not handle any routes under /api or other server-side routes.
app.get("*", (req: Request, res: Response) => {
  // If a developer messes up the api routes, send a 404 error with informative error
  if (req.originalUrl.startsWith("/api")) {
    res.status(404).send({ error: "API route not found" });
  } else {
    // If the client tries to navigate to an unknown page, send them the index.html file
    res.sendFile(
      path.join(__dirname, "../../../../frontend/dist/", "index.html"),
    );
  }
});

// eslint-disable-next-line @typescript-eslint/no-unused-vars
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  console.error("Server Error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

// Start the server and listen on port defined in .env file
app.listen(PORT, () => {
  console.log(`Server is up on port: ${PORT}`);
});
