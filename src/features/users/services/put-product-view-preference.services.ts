import { models } from "@lib/sequelize";

const User = models.User;

export const editPreferenceInProductViewService = async (
  user_id: string,
  preferenceInProductView: string,
) => {
  const user = await User.findByPk(user_id);
  if (user) {
    await user.update({
      config: {
        ...user.config,
        preference_in_product_view: preferenceInProductView,
      },
    });
  }
  return { status: 200, body: { error: false, message: "Todo ok " } };
};
