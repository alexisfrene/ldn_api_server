import { body } from "express-validator";

export const createBrandValidator = [
  body("title").notEmpty().isString().isLength({ min: 3, max: 50 }),
];
