import { Uuid } from "types";
import { hashPassword } from "@utils";
import { Models } from "@models";

export const seedUsers = async (models: Models) => {
  try {
    await models.User.bulkCreate([
      {
        user_id: "123e4567-e89b-12d3-a456-426614174000" as Uuid,
        first_name: "UserTest01",
        email: "user1@example.com",
        password_hash: await hashPassword("werwer321321"),
        gender: "male",
        last_name: "Frene",
        username: "frenea",
        avatar_url:
          "https://res.cloudinary.com/ldn-img/image/upload/v1711132173/default-avatar/male.webp",
      },
    ]);

    console.log("Seeding Users completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};
