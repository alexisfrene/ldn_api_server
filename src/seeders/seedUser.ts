import { Models } from "@models";
import { hashPassword } from "@utils";
import { user_id } from "./contextSeeders";

const seedUsers = async (models: Models) => {
  try {
    await models.User.bulkCreate(
      [
        {
          user_id,
          first_name: "UserTest01",
          email: "user1@example.com",
          password_hash: await hashPassword("werwer321321"),
          gender: "male",
          last_name: "Frene",
          username: "frenea",
          avatar_url:
            "https://res.cloudinary.com/ldn-img/image/upload/v1711132173/default-avatar/male.webp",
        },
      ],
      { ignoreDuplicates: true },
    );

    console.log("Seeding Users completed successfully!");
  } catch (error) {
    console.error("Error seeding database:", error);
  }
};

export default seedUsers;
