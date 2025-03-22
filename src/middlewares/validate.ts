import { NextFunction, Request, RequestHandler, Response } from "express";
import { ContextRunner } from "express-validator";

// can be reused by many routes
export const runValidate = (validations: ContextRunner[]): RequestHandler => {
  return async (req: Request, res: Response, next: NextFunction) => {
    // sequential processing, stops running validations chain if one fails.
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        next({ errors: result.array() });
      }
    }

    next();
  };
};
