import { body, param } from "express-validator";

export const createFinancialAccountValidations = [
  body("name").isString().withMessage("El nombre debe ser una cadena."),
  body("type")
    .isIn(["inflow_of_money", "money_outflow", "debt"])
    .withMessage("Tipo debe ser uno de: inflow_of_money, money_outflow, debt."),
];

export const editFinancialAccountValidations = [
  param("id").isUUID().withMessage("El ID debe ser un UUID válido."),
  body("name")
    .optional()
    .isString()
    .withMessage("El nombre debe ser una cadena."),
  body("type")
    .optional()
    .isIn(["inflow_of_money", "money_outflow", "debt"])
    .withMessage("Tipo debe ser uno de: inflow_of_money, money_outflow, debt."),
  body("values")
    .optional()
    .isArray()
    .withMessage("Los valores deben ser un arreglo."),
];

export const deleteFinancialAccountValidations = [
  param("id").isUUID().withMessage("El ID debe ser un UUID válido."),
];

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
    .isInt({ gt: 0 })
    .withMessage("El valor debe ser un número entero positivo."),
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
    .exists()
    .withMessage("La fecha de entrada es obligatoria.")
    .isDate()
    .withMessage("La fecha de entrada debe ser una fecha válida."),

  body("label")
    .exists()
    .withMessage("La etiqueta es obligatoria.")
    .isString()
    .withMessage("La etiqueta debe ser una cadena."),

  body("value")
    .exists()
    .withMessage("El valor es obligatorio.")
    .isInt({ gt: 0 })
    .withMessage("El valor debe ser un número entero positivo."),

  body("type")
    .exists()
    .withMessage("El tipo es obligatorio.")
    .isIn(["inflow_of_money", "money_outflow"])
    .withMessage("El tipo debe ser uno de: inflow_of_money, money_outflow."),

  body("financial_accounts_id")
    .optional()
    .isUUID()
    .withMessage("El ID de la cuenta financiera debe ser un UUID válido."),

  body("payment_method_id")
    .optional()
    .isUUID()
    .withMessage("El ID del método de pago debe ser un UUID válido."),
];
