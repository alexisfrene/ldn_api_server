import { body } from "express-validator";

export const createExpenseValidations = [
  body("description")
    .isString()
    .notEmpty()
    .withMessage("Descripción es requerida"),
  body("amount")
    .isFloat({ gt: 0 })
    .withMessage("Cantidad debe ser un número positivo"),
  body("transaction_date")
    .isISO8601()
    .toDate()
    .withMessage("Fecha de transacción inválida"),
];
