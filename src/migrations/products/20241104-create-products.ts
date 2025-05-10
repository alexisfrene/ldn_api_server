import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("products", {
    product_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    name: {
      type: DataTypes.STRING(50),
      allowNull: false,
      defaultValue: "Sin nombre",
    },
    description: {
      type: DataTypes.STRING(100),
      defaultValue: "Sin descripción",
    },
    primary_image: {
      type: DataTypes.STRING,
      defaultValue: "/default_image",
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
      allowNull: true,
    },
    category_value: {
      type: DataTypes.STRING,
    },
    size_value: {
      type: DataTypes.STRING,
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    user_id: {
      type: DataTypes.UUID,
      references: { model: "users", key: "user_id" },
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: { model: "categories", key: "category_id" },
    },
    size_id: {
      type: DataTypes.INTEGER,
      references: { model: "sizes", key: "size_id" },
    },
    variation_id: {
      type: DataTypes.UUID,
      allowNull: true,
      references: { model: "variations", key: "variation_id" },
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("products");
}
