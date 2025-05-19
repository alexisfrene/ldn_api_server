export const changePasswordService = async (
  category_id: string,
  category_value: string,
) => {
  // Aquí va la lógica real para cambiar la contraseña del usuario
  return { status: 200, body: { category_id, category_value } };
};
