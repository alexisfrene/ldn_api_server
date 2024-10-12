import express from "express";
export type Uuid = string & { __uuidBrand: never };
export type ISO8601Date = string & { __iso8601DateBrand: never };
export type ImagePath = string & { __imagePathBrand: never };

declare module "../config/sequelize.config" {
  const sequelizeConfig: any;
  export default sequelizeConfig;
}

declare global {
  namespace Express {
    interface Request {
      user?: Uuid;
      productType?: string;
      sizeType?: string;
    }
  }
}
