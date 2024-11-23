import { TemplateService } from "../TemplatesAPI/templateRequests.js";
import { Request, Response } from "express";

export const addTemplate = (req: Request, res: Response) => {
  TemplateService.addTemplate(req, res, (error: any) => {
    if (error) console.error(error);
  });
};

export const updateTemplate = (req: Request, res: Response) => {
  TemplateService.updateTemplate(req, res, (error: any) => {
    if (error) console.error(error);
  });
};

export const deleteTemplateByTitle = (req: Request, res: Response) => {
  TemplateService.deleteTemplateByTitle(req, res, (error: any) => {
    if (error) console.error(error);
  });
};

export const deleteTemplateByKey = (req: Request, res: Response) => {
  TemplateService.deleteTemplateByKey(req, res, (error: any) => {
    if (error) console.error(error);
  });
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
