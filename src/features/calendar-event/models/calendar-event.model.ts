import {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Uuid } from "types";
import { Models } from "@models";

export type CalendarEventAttributes = InferAttributes<CalendarEvent>;
export type CalendarEventCreationAttributes =
  InferCreationAttributes<CalendarEvent>;

export class CalendarEvent extends Model<
  CalendarEventAttributes,
  CalendarEventCreationAttributes
> {
  declare calendar_event_id: CreationOptional<number>; // ID autoincremental
  declare title: string;
  declare description: CreationOptional<string | null>;
  declare start: Date;
  declare end: Date;
  declare allDay: CreationOptional<boolean>;
  declare color: CreationOptional<string | null>;
  declare location: CreationOptional<string | null>;
  declare user_id: Uuid; // FK a usuario

  static associate(models: Models) {
    CalendarEvent.belongsTo(models.User, {
      as: "UserEventsCalendar",
      foreignKey: "user_id",
    });
  }
}

export default (sequelize: Sequelize) => {
  CalendarEvent.init(
    {
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
    },
    {
      sequelize,
      modelName: "CalendarEvent",
      tableName: "calendar_events",
      timestamps: true, // para createdAt, updatedAt
    },
  );

  return CalendarEvent;
};
