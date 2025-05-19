import { body } from "express-validator";

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
      'La frecuencia de pago debe ser "monthly", "bi-weekly" o "weekly".',
    ),
  body("minimum_payment")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("El pago mínimo debe ser un número mayor o igual a 0."),
  body("notes")
    .optional()
    .isString()
    .withMessage("Las notas deben ser un texto."),
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
            ["unpaid", "paid"].includes(installment.status),
        );
      }
      return true;
    })
    .withMessage(
      "Cada cuota debe tener un monto positivo, una fecha de vencimiento válida y un estado adecuado (unpaid, paid).",
    ),
];
