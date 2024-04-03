// Importa los modelos necesarios correctamente
import { DataTypes } from "sequelize";
import { sequelize } from "../../";
import { User } from "./Users";
import { Size } from "./Sizes";
import { Category } from "./Categories";
import { ProductDetails } from "./ProductDetails"; // Corregido el nombre de la importación

// Define el modelo Product
export const Product = sequelize.define(
  "products",
  {
    id_product: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(15),
      allowNull: false,
      defaultValue: "Sin nombre",
    },
    description: {
      type: DataTypes.STRING(50),
      defaultValue: "Sin descripción",
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    state: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    code: {
      type: DataTypes.INTEGER,
      autoIncrementIdentity: true,
    },
    stock: {
      type: DataTypes.INTEGER,
      defaultValue: 1,
    },
    discount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
    },
    dollar_today: {
      type: DataTypes.INTEGER,
    },
  },
  { timestamps: true }
);

// Corrige las relaciones utilizando los nombres de las claves foráneas correctos
Product.hasOne(User, { foreignKey: "user_id" });
Product.hasMany(Size, { foreignKey: "product_id" }); // Utiliza el nombre correcto de la clave foránea
Product.hasMany(Category, { foreignKey: "product_id" }); // Utiliza el nombre correcto de la clave foránea
Product.hasOne(ProductDetails, { foreignKey: "product_id" }); // Utiliza el nombre correcto de la clave foránea
