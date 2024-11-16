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
      'El tipo debe ser "inflow_of_money" o "money_outflow" , "debt.'
    ),
  body("value")
    .isInt({ min: 1 })
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

export const createDebtValidations = [
  body("name")
    .isString()
    .withMessage("El nombre debe ser un texto.")
    .isLength({ max: 50 })
    .withMessage("El nombre debe tener como máximo 50 caracteres."),
  body("money_to_receive")
    .isFloat({ min: 0 })
    .withMessage("El monto recibido es obligatorio"),
  body("payment_frequency")
    .isIn(["monthly", "bi-weekly", "weekly"])
    .withMessage(
      'La frecuencia de pago debe ser "monthly", "bi-weekly" o "weekly".'
    ),
  body("minimum_payment")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("El pago mínimo debe ser un número mayor o igual a 0."),
  body("notes")
    .optional()
    .isString()
    .withMessage("Las notas deben ser un texto."),
  body("current_quota")
    .isInt({ min: 1 })
    .withMessage(
      "La cuota actual debe ser un número entero mayor o igual a 1."
    ),
  body("installments")
    .isArray({ min: 1 })
    .withMessage("Se requiere al menos una cuota en installments.")
    .custom((installments) => {
      if (installments.length > 0) {
        return installments.every(
          (installment: {
            amount: number;
            status: "unpaid" | "paid";
            due_date: Date;
          }) =>
            typeof installment.amount === "number" &&
            installment.amount > 0 &&
            typeof installment.due_date === "string" &&
            new Date(installment.due_date).toString() !== "Invalid Date" &&
            ["unpaid", "paid"].includes(installment.status)
        );
      }
      return true;
    })
    .withMessage(
      "Cada cuota debe tener un monto positivo, una fecha de vencimiento válida y un estado adecuado (unpaid, paid)."
    ),
];

export const createPaymentMethodsValidations = [
  body("name")
    .isString()
    .withMessage("El nombre debe ser un texto.")
    .notEmpty()
    .withMessage("El nombre del método de pago es obligatorio.")
    .isLength({ max: 100 })
    .withMessage("El nombre debe tener como máximo 100 caracteres."),
];
