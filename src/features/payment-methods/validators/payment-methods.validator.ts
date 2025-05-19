import { body } from "express-validator";

export const createPaymentMethodsValidations = [
  body("name")
    .isString()
    .withMessage("El nombre debe ser un texto.")
    .notEmpty()
    .withMessage("El nombre del método de pago es obligatorio.")
    .isLength({ max: 100 })
    .withMessage("El nombre debe tener como máximo 100 caracteres."),
];
