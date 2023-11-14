const { DataTypes } = require("sequelize");
const { sequelize } = require("../lib/db");

const ProductModel = sequelize.define("Product", {
  description: {
    type: DataTypes.STRING,
  },
  primaryImage: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  variations: {
    type: DataTypes.ARRAY(DataTypes.STRING),
  },
  miniatureImage: {
    type: DataTypes.STRING,
  },
});

module.exports = ProductModel;
