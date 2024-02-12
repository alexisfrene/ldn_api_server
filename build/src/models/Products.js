"use strict";
// import { DataTypes } from "sequelize";
// import { supabase } from "../lib/supabase";
// const ProductModel = sequelize.define(
//   "Product",
//   {
//     id: {
//       type: DataTypes.UUID,
//       primaryKey: true,
//       defaultValue: DataTypes.UUIDV4,
//     },
//     category: {
//       type: DataTypes.STRING,
//     },
//     primaryImage: {
//       type: DataTypes.STRING,
//     },
//     miniatureImage: {
//       type: DataTypes.STRING,
//     },
//     variations: {
//       type: DataTypes.ARRAY(DataTypes.JSONB),
//       defaultValue: [],
//     },
//     description: {
//       type: DataTypes.STRING,
//     },
//     details: {
//       type: DataTypes.JSONB,
//       defaultValue: {},
//       allowNull: false,
//       validate: {
//         isObject(value) {
//           if (
//             typeof value !== "object" ||
//             value === null ||
//             Array.isArray(value)
//           ) {
//             throw new Error("details debe ser un objeto JSON válido");
//           }
//         },
//       },
//     },
//   },
//   {
//     getterMethods: {
//       color() {
//         return this.getDataValue("details.color");
//       },
//       brand() {
//         return this.getDataValue("details.brand");
//       },
//       style() {
//         return this.getDataValue("details.style");
//       },
//       gender() {
//         return this.getDataValue("details.gender");
//       },
//     },
//   }
// );
// export default ProductModel;
