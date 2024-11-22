import express from "express";

import {
  getAllTemplates,
  addTemplate,
  updateTemplate,
} from "../controllers/templateController.js";

const router = express.Router();

// router.get("/", getAllTemplates);
router.get("/", getAllTemplates);
router.post("/", addTemplate);
router.put("/", updateTemplate);
export default router;
