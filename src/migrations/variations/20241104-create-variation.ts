import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("variations", {
    variation_id: {
      type: DataTypes.UUID,
      primaryKey: true,
      defaultValue: DataTypes.UUIDV4,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "Sin nombre",
    },
    category_value: {
      type: DataTypes.STRING,
      defaultValue: "",
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    values: {
      type: DataTypes.ARRAY(DataTypes.JSONB),
      defaultValue: [],
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("variations");
}
