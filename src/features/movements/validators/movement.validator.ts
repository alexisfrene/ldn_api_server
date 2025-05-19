import { body, param } from "express-validator";

export const editMovementValidations = [
  param("id").isUUID().withMessage("El ID debe ser un UUID válido."),
  body("entry_date")
    .optional()
    .isDate()
    .withMessage("La fecha de entrada debe ser una fecha válida."),
  body("label")
    .optional()
    .isString()
    .withMessage("La etiqueta debe ser una cadena."),
  body("value")
    .optional()
    .isFloat({ gt: 0 })
    .withMessage("El valor debe ser un número positivo."),
  body("type")
    .optional()
    .isIn(["inflow_of_money", "money_outflow"])
    .withMessage("El tipo debe ser uno de: inflow_of_money, money_outflow."),
];

export const deleteMovementValidations = [
  param("id").isUUID().withMessage("El ID debe ser un UUID válido."),
];

export const createMovementValidations = [
  body("entry_date")
    .isISO8601()
    .withMessage("La fecha debe estar en formato ISO8601 (YYYY-MM-DD).")
    .notEmpty()
    .withMessage("La fecha de entrada es obligatoria."),
  body("label")
    .isString()
    .withMessage("El nombre debe ser un texto.")
    .isLength({ max: 255 })
    .withMessage("El nombre no debe superar los 255 caracteres.")
    .notEmpty()
    .withMessage("El nombre es obligatorio."),
  body("type")
    .isIn(["inflow_of_money", "money_outflow", "debt"])
    .withMessage(
      'El tipo debe ser "inflow_of_money" o "money_outflow" , "debt.',
    ),
  body("value")
    .isFloat({ min: 1 })
    .withMessage("El valor debe ser un número entero positivo.")
    .notEmpty()
    .withMessage("El valor es obligatorio."),
  body("payment_method_id")
    .optional()
    .isInt()
    .withMessage("El ID del método de pago debe ser un número entero."),
  body("financial_accounts_id")
    .optional()
    .isUUID()
    .withMessage("El ID de la cuenta financiera debe ser un UUID válido."),
  body("expense_id")
    .optional()
    .isUUID()
    .withMessage("El ID de gasto debe ser un UUID válido."),
  body("debt_id")
    .optional()
    .isUUID()
    .withMessage("El ID de deuda debe ser un UUID válido."),
];
