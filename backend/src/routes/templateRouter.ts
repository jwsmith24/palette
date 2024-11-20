import express from "express";

import {
  getAllTemplates,
  addTemplate,
} from "../controllers/templateController.js";

const router = express.Router();

// router.get("/", getAllTemplates);

router.post("/", addTemplate);

export default router;
