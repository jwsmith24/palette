// Router for all /rubrics requests
import express from "express";
import { handleGetTemplateById } from "../controllers/handleGetTemplateById";
import { handleGetAllTemplates } from "../controllers/handleGetAllTemplates";
import { handleGetTempalteIdByTitle } from "../controllers/handleGetTemplateByTitle";
import { handleDeleteTemplate } from "../controllers/handleDeleteTemplates";

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
