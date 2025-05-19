export const changeNameService = async (
  category_id: string,
  category_value: string,
) => {
  // Aquí va la lógica real para cambiar el nombre del usuario
  return { status: 200, body: { category_id, category_value } };
};
