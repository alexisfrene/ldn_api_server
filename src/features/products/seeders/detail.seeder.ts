import { Uuid } from "types";
import { Models } from "@models";

const seedDetails = async (models: Models) => {
  try {
    await models.Detail.bulkCreate(
      [
        {
          product_id: "123e4567-e89b-12d3-a456-426614174001" as Uuid,
          age: "Nuevo",
          brand_id: 1,
          color: "Rojo",
          gender: "Unisex",
          style: "Moderno",
        },
        {
          product_id: "123e4567-e89b-12d3-a456-426614174002" as Uuid,
          age: "Usado",
          brand_id: 1,
          color: "Azul",
          gender: "Masculino",
          style: "Deportivo",
        },
        {
          product_id: "123e4567-e89b-12d3-a456-426614174003" as Uuid,
          age: "Nuevo",
          brand_id: 1,
          color: "Verde",
          gender: "Femenino",
          style: "Elegante",
        },
        {
          product_id: "123e4567-e89b-12d3-a456-426614174004" as Uuid,
          age: "Antiguo",
          brand_id: 1,
          color: "Negro",
          gender: "Unisex",
          style: "Clásico",
        },
        {
          product_id: "123e4567-e89b-12d3-a456-426614174005" as Uuid,
          age: "Nuevo",
          brand_id: 1,
          color: "Blanco",
          gender: "Masculino",
          style: "Casual",
        },
        {
          product_id: "123e4567-e89b-12d3-a456-426614174006" as Uuid,
          age: "Usado",
          brand_id: 1,
          color: "Gris",
          gender: "Femenino",
          style: "Vintage",
        },
      ],
      { ignoreDuplicates: true },
    );

    console.log("Seeding Details completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
export default seedDetails;
