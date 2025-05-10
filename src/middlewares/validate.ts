import express from "express";
import { ContextRunner } from "express-validator";

export const runValidate = (validations: ContextRunner[]) => {
  return async (
    req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
    }

    return next();
  };
};
