import { Request, Response } from "express";
import { models } from "@lib";
import { deleteFromMinio } from "@lib/minio";

const { Category, User } = models;

export const deleteCategoryValue = async (req: Request, res: Response) => {
  try {
    const user_id = req.user;
    const category_id = req.params.id;
    const category_value = req.query.value_id;

    if (!category_id || !category_value || !user_id) {
      return res.status(400).json({
        error: true,
        message: "Faltan datos: category_id, value_id o user_id",
      });
    }

    const categorySelected = await Category.findByPk(category_id);
    if (!categorySelected) {
      return res.status(404).json({
        error: true,
        message: "Categoría no encontrada",
      });
    }

    const deleteValue = categorySelected.values.find(
      (value: { id: string }) => value.id === category_value,
    );

    if (!deleteValue) {
      return res.status(404).json({
        error: true,
        message: "Valor de categoría no encontrado",
      });
    }

    const newValues = categorySelected.values.filter(
      (value: { id: string }) => value.id !== category_value,
    );

    const user = await User.findByPk(user_id);
    if (user) {
      const userProducts = await user.getUserProducts({
        where: { category_id, category_value },
      });

      await Promise.all(
        userProducts.map((product: any) =>
          product.update({ category_value: null }),
        ),
      );
    }

    if (deleteValue.icon_url) {
      await deleteFromMinio(deleteValue.icon_url, `${user_id}/categories`);
    }

    const updatedCategory = await categorySelected.update({
      values: newValues,
    });

    return res.status(200).json({
      message: "Valor eliminado correctamente",
      data: updatedCategory,
    });
  } catch (error) {
    console.error("Error en deleteCategoryValue:", error);
    return res.status(500).json({
      error: true,
      message: "Error interno del servidor",
    });
  }
};
