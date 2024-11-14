import { Uuid } from "types";
import { Models } from "@models";
import { user_id } from "./contextSeeders";

const seedProducts = async (models: Models) => {
  try {
    await models.Product.bulkCreate(
      [
        {
          user_id,
          product_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
          name: "Producto 1",
          category_id: 101,
          description: "Descripción del producto 1",
          price: 5000,
          primary_image: "1729890946850-0.8354834895998975",
          size_id: 101,
          state: true,
          category_value: "default",
          size_value: "default",
        },
        {
          user_id,
          product_id: "123e4567-e89b-12d3-a456-426614174001" as Uuid,
          name: "Producto 1",
          category_id: 101,
          description: "Descripción del producto 1",
          price: 5000,
          primary_image: "1729890946850-0.8354834895998975",
          size_id: 101,
          state: true,
          category_value: "default",
          size_value: "default",
        },
        {
          user_id,
          product_id: "123e4567-e89b-12d3-a456-426614174002" as Uuid,
          name: "Producto 1",
          category_id: 101,
          description: "Descripción del producto 1",
          price: 5000,
          primary_image: "1729890946850-0.8354834895998975",
          size_id: 101,
          state: true,
          category_value: "default",
          size_value: "default",
        },
        {
          user_id,
          product_id: "123e4567-e89b-12d3-a456-426614174003" as Uuid,
          name: "Producto 1",
          category_id: 101,
          description: "Descripción del producto 1",
          price: 5000,
          primary_image: "1729890946850-0.8354834895998975",
          size_id: 101,
          state: true,
          category_value: "default",
          size_value: "default",
        },
        {
          user_id,
          product_id: "123e4567-e89b-12d3-a456-426614174004" as Uuid,
          name: "Producto 1",
          category_id: 101,
          description: "Descripción del producto 1",
          price: 5000,
          primary_image: "1729890946850-0.8354834895998975",
          size_id: 101,
          state: true,
          category_value: "default",
          size_value: "default",
        },
        {
          user_id,
          product_id: "123e4567-e89b-12d3-a456-426614174005" as Uuid,
          name: "Producto 1",
          category_id: 101,
          description: "Descripción del producto 1",
          price: 5000,
          primary_image: "1729890946850-0.8354834895998975",
          size_id: 101,
          state: true,
          category_value: "default",
          size_value: "default",
        },
        {
          user_id,
          product_id: "123e4567-e89b-12d3-a456-426614174006" as Uuid,
          name: "Producto 1",
          category_id: 101,
          description: "Descripción del producto 1",
          price: 5000,
          primary_image: "1729890946850-0.8354834895998975",
          size_id: 101,
          state: true,
          category_value: "default",
          size_value: "default",
        },
      ],
      { ignoreDuplicates: true }
    );

    console.log("Seeding Products completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
export default seedProducts;
