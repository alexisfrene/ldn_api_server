import { DataTypes, QueryInterface } from "sequelize";

export async function up(queryInterface: QueryInterface) {
  await queryInterface.createTable("users", {
    user_id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      unique: true,
    },
    config: {
      type: DataTypes.JSON,
      defaultValue: { local_image_saving: true },
    },
    last_name: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [1, 15],
      },
    },
    first_name: {
      type: DataTypes.STRING(15),
      allowNull: false,
      validate: {
        isAlpha: true,
        len: [1, 15],
      },
    },
    username: {
      type: DataTypes.STRING(15),
      unique: true,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    email: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    recent_activity: {
      type: DataTypes.ARRAY(DataTypes.JSON),
      defaultValue: [],
    },
    birthday_date: {
      type: DataTypes.DATE,
      defaultValue: null,
    },
    phone_number: { type: DataTypes.STRING, defaultValue: null },
    gender: {
      type: DataTypes.ENUM("male", "female", "unspecified"),
      allowNull: false,
    },
    session_token: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    password_hash: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      defaultValue: null,
    },
    avatar_url: {
      type: DataTypes.STRING(255),
    },
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
  });
}

export async function down(queryInterface: QueryInterface) {
  await queryInterface.dropTable("users");
}
