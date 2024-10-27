import { Request, Response } from "express";
import { models } from "@lib";
import { Uuid } from "types";

const { FinancialAccount } = models;

export const createFinancialAccounts = async (req: Request, res: Response) => {
  const user_id = req.user;
  const { name }: { name: string } = req.body;
  const newFinancialAccount = await FinancialAccount.create({
    name,
    user_id: user_id as Uuid,
  });

  return res.status(200).json({ newFinancialAccount });
};
