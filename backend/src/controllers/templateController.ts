import { TemplateService } from "../TemplatesAPI/templateRequests.js";
import { Template } from "palette-types";
import { Criteria } from "palette-types";
import { Request, Response } from "express";

export const getAllTemplates = (req: Request, res: Response) => {
  TemplateService.getAllTemplates(req, res, (error: any) => {
    if (error) console.error(error);
  });
};

export const getTemplateByKey = (req: Request, res: Response) => {
  TemplateService.getTemplateByKey(req, res, (error: any) => {
    if (error) console.error(error);
  });
};

export const getTemplateByTitle = (req: Request, res: Response) => {
  TemplateService.getTemplateByTitle(req, res, (error: any) => {
    if (error) console.error(error);
  });
};

export const addTemplate = (req: Request) => {
  console.log("template received in template controller");
  TemplateService.addTemplate(req);
};

export const updateTemplate = (req: Request) => {
  TemplateService.updateTemplate(req);
};
