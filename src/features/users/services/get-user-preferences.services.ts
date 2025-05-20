import { models } from "@lib/sequelize";

const User = models.User;

export const getPreferenceInProductViewService = async (user_id: string) => {
  if (user_id) {
    const user = await User.findByPk(user_id);
    if (user)
      return {
        status: 200,
        body: {
          preference_in_product_view:
            user.config.preference_in_product_view || false,
        },
      };
  }
  return { status: 401, body: { error: "Falta token" } };
};
