import { QueryInterface, DataTypes } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("categories", {
    category_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(50),
      defaultValue: "",
    },
    type: {
      type: DataTypes.STRING(10),
      defaultValue: "product",
    },
    values: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue: [],
      allowNull: false,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("categories");
}
