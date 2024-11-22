import express from "express";

import {
  getAllTemplates,
  addTemplate,
  updateTemplate,
  getTemplateByKey,
} from "../controllers/templateController.js";

const router = express.Router();

// router.get("/", getAllTemplates);
router.get("/", getAllTemplates);

router.get("/:key", getTemplateByKey);
router.post("/", addTemplate);
router.put("/", updateTemplate);
export default router;
