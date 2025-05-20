import { models } from "@lib/sequelize";

const User = models.User;

export const getAvatarService = async (user_id: string) => {
  if (user_id) {
    const userSelected = await User.findByPk(user_id);

    if (userSelected) {
      return {
        status: 200,
        body: {
          avatar_url:
            userSelected.avatar_url &&
            userSelected.avatar_url.replace(/\.[^/.]+$/, ""),
          username: userSelected.username,
          email: userSelected.email,
        },
      };
    }
  }
  return { status: 401, body: { error: "Falta token" } };
};
