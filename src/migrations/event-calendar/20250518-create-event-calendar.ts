import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("calendar_events", {
    calendar_event_id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    start: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    end: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    allDay: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    color: {
      type: DataTypes.STRING(20),
      allowNull: true,
    },
    location: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    user_id: {
      type: DataTypes.UUID,
      allowNull: false,
    },
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("calendar_events");
}
