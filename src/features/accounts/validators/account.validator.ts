import { body, param } from "express-validator";

export const createFinancialAccountValidations = [
  body("name").isString().withMessage("El nombre debe ser una cadena."),
  body("paymentMethods")
    .isArray()
    .withMessage("Los métodos de pago deben ser un arreglo."),
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
