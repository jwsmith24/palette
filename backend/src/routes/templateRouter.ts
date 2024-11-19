import express from "express";

import { getAllTemplates } from "../controllers/templateController.js";

const router = express.Router();

router.get("/", getAllTemplates);

export default router;
