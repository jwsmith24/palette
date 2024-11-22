import { TemplateService } from "../TemplatesAPI/templateRequests.js";
import { Request, Response } from "express";

export const addTemplate = (req: Request) => {
  TemplateService.addTemplate(req);
};

export const updateTemplate = (req: Request) => {
  TemplateService.updateTemplate(req);
};

export const deleteTemplateByTitle = (req: Request) => {
  TemplateService.deleteTemplateByTitle(req);
};

export const deleteTemplateByKey = (req: Request) => {
  TemplateService.deleteTemplateByKey(req);
};

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
