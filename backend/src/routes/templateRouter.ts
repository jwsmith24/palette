// Router for all /rubrics requests
import express from "express";
import validateRubric from "../validators/rubricValidator.js";
import { handleCreateTemplate } from "src/controllers/handleCreateTemplate.js";
import { handleGetTemplateById } from "src/controllers/handleGetTemplateById.js";
import { handleUpdateTemplate } from "src/controllers/handleUpdateTemplate.js";
import { handleDeleteTemplate } from "src/controllers/handleDeleteTemplates.js";
import { handleGetTempalteIdByTitle } from "src/controllers/handleGetTemplateByTitle.js";
import { handleGetAllTemplates } from "src/controllers/handleGetAllTemplates.js";
const router = express.Router();

/**
 * @route POST /templates
 */
// router.post("/", validateRubric, rubricFieldErrorHandler, handleCreateTemplate);

/**
 * @route GET /templates/:id
 */
router.get("/:id", handleGetTemplateById);

/**
 * @route GET /templates
 */
router.get("/", handleGetAllTemplates);

/**
 * @route PUT /templates/:id
 */
// router.put("/:id", validateRubric, rubricFieldErrorHandler, handleUpdateTemplate);

/**
 * @route GET /templates/title/:title
 */
router.get("/title/:title", handleGetTempalteIdByTitle);

/**
 * @route DELETE /templates/:id
 */
router.delete("/:id", handleDeleteTemplate);

export default router;
