import { Template, Settings, Criteria } from "palette-types";
import asyncHandler from "express-async-handler";
import { Request, Response } from "express";
import { createTemplate } from "../../../frontend/src/utils/templateFactory.js";
import fs from "fs";

/**
 * This file contains the interface for the RubricService class.
 * The RubricService class is responsible for handling all the business logic for rubrics.
 * This includes creating, updating, deleting, and retrieving rubrics from the datastore.
 */

// Construct an absolute path
const settingsPath = "./settings.json";

export const TemplateService = {
  // POST REQUESTS (Templates Setter/Page Functions)

  addTemplate: async (req: Request) => {
    console.log("template data", req.body);
    const settingsData = fs.readFileSync(settingsPath, "utf8");
    const settings: Settings = JSON.parse(settingsData) as Settings;
    console.log("settings templates", settings.templates);
    const template = createTemplate();
    const templateData = req.body as Template | null;
    if (templateData) {
      const templateIndex = settings.templates.findIndex(
        (tmplt) => tmplt.title === templateData.title
      );
      template.title = templateData.title;
      template.criteria = templateData.criteria;
      template.id = templateData.id;
      template.key = templateData.key;
      if (templateIndex === -1) {
        // only push if the template doesn't already exist
        settings.templates.push(template);
      } else {
        // update the existing template
        console.log("Template already exists!");
      }
      fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
    }
  },

  updateTemplate: async (req: Request) => {
    console.log("updating template request", req.body);
    const settingsData = fs.readFileSync(settingsPath, "utf8");
    const settings: Settings = JSON.parse(settingsData) as Settings;
    const templateData = req.body as Template | null;
    if (templateData) {
      const templateIndex = settings.templates.findIndex(
        (tmplt) => tmplt.title === templateData.title
      );
      console.log("templateIndex", templateIndex);
      console.log("templateData", templateData);
      if (templateIndex !== -1) {
        settings.templates[templateIndex] = templateData;

        console.log("updated templates", settings.templates);
        console.log("settings", settings);
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
      }
    }
  },

  // DELETE REQUESTS (Templates Page Functions)
  deleteTemplateByKey: async (req: Request) => {
    const settingsData = fs.readFileSync(settingsPath, "utf8");
    const settings: Settings = JSON.parse(settingsData) as Settings;
    const templateKey = req.params.key;
    if (templateKey) {
      const templateIndex = settings.templates.findIndex(
        (tmplt) => tmplt.key === templateKey
      );
      if (templateIndex !== -1) {
        settings.templates.splice(templateIndex, 1);
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
      }
    }
  },

  deleteAllCriteriaByTitle: async (req: Request) => {
    const settingsData = fs.readFileSync(settingsPath, "utf8");
    const settings: Settings = JSON.parse(settingsData) as Settings;
    const templateTitle = req.params.title;
    if (templateTitle) {
      const templateIndex = settings.templates.findIndex(
        (tmplt) => tmplt.title === templateTitle
      );
      if (templateIndex !== -1) {
        settings.templates[templateIndex].criteria = [];
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
      }
    }
  },

  deleteAllCriteriaByKey: async (req: Request) => {
    const settingsData = fs.readFileSync(settingsPath, "utf8");
    const settings: Settings = JSON.parse(settingsData) as Settings;
    const templateKey = req.params.key;
    if (templateKey) {
      const templateIndex = settings.templates.findIndex(
        (tmplt) => tmplt.key === templateKey
      );
      if (templateIndex !== -1) {
        settings.templates[templateIndex].criteria = [];
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
      }
    }
  },

  deleteTemplateByTitle: async (req: Request) => {
    console.log("template data", req.body);
    const settingsData = fs.readFileSync(settingsPath, "utf8");
    const settings: Settings = JSON.parse(settingsData) as Settings;
    const templateTitle = req.params.title;
    if (templateTitle) {
      const templateIndex = settings.templates.findIndex(
        (tmplt) => tmplt.title === templateTitle
      );
      if (templateIndex !== -1) {
        settings.templates.splice(templateIndex, 1);
        fs.writeFileSync(settingsPath, JSON.stringify(settings, null, 2));
      }
    }
  },

  // GET REQUESTS (Templates API Functions)

  getAllTemplates: asyncHandler(async (req: Request, res: Response) => {
    const settingsData = fs.readFileSync(settingsPath, "utf8");
    const settings: Settings = JSON.parse(settingsData) as Settings;
    res.json(settings.templates);
  }),

  getTemplateByKey: asyncHandler(async (req: Request, res: Response) => {
    const settingsData = fs.readFileSync(settingsPath, "utf8");
    const settings: Settings = JSON.parse(settingsData) as Settings;
    const templateKey = req.params.key;
    if (templateKey) {
      const templateIndex = settings.templates.findIndex(
        (tmplt) => tmplt.key === templateKey
      );
      if (templateIndex !== -1) {
        res.json(settings.templates[templateIndex]);
      }
    }
  }),

  getTemplateByTitle: asyncHandler(async (req: Request, res: Response) => {
    const settingsData = fs.readFileSync(settingsPath, "utf8");
    const settings: Settings = JSON.parse(settingsData) as Settings;
    const templateTitle = req.params.title;
    if (templateTitle) {
      const templateIndex = settings.templates.findIndex(
        (tmplt) => tmplt.title === templateTitle
      );
      console.log("templateIndex", templateIndex);
      if (templateIndex !== -1) {
        res.json(settings.templates[templateIndex]);
      }
    }
  }),
};
