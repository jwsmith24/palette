import express from "express";
import { validationErrorHandler } from "../middleware/validationErrorHandler.js";

import {
  getAllTemplates,
  addTemplate,
  updateTemplate,
} from "../controllers/templateController.js";

const router = express.Router();

// router.get("/", getAllTemplates);
router.get("/", getAllTemplates);
router.post("/temp", validationErrorHandler, addTemplate);
router.put("/", validationErrorHandler, updateTemplate);
export default router;
