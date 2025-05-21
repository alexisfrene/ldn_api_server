import {
  CreationOptional,
  DataTypes,
  HasManyGetAssociationsMixin,
  InferAttributes,
  InferCreationAttributes,
  Model,
  Sequelize,
} from "sequelize";
import { Uuid } from "types";
import { UserAttributes } from "@users-models/user.model";
import { Models } from "@models";

export type BrandAttributes = InferAttributes<
  Brand,
  { omit: "user_id" | "detail_id" }
>;
export type BrandCreationAttributes = InferCreationAttributes<Brand>;
export class Brand extends Model<BrandAttributes, BrandCreationAttributes> {
  declare brand_id: CreationOptional<number>;
  declare title: string;
  declare user_id?: Uuid;
  declare detail_id?: Uuid;

  declare getBrandUser: HasManyGetAssociationsMixin<UserAttributes>;

  static associate(models: Models) {
    const BrandUser = Brand.belongsTo(models.User, {
      as: "BrandUser",
      foreignKey: "user_id",
    });
    const BrandDetails = Brand.hasMany(models.Detail, {
      as: "BrandDetails",
      foreignKey: "brand_id",
    });
    return {
      BrandUser,
      BrandDetails,
    };
  }
}

export default (sequelize: Sequelize) => {
  Brand.init(
    {
      brand_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(10),
        allowNull: false,
      },
    },
    { sequelize, modelName: "Brand", tableName: "brands", timestamps: false },
  );
  return Brand;
};
