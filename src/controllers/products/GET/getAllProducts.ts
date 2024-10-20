import { Request, Response } from "express";
import { getSecureUrl, db } from "../../../lib";

const User = db.User;
const Product = db.Product;

export const getAllProducts = async (req: Request, res: Response) => {
  const user_id = req.user;
  const user = await User.findByPk(user_id || "");
  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }
  const allProducts = user?.getUser_products()
    ? await user.getUser_products()
    : [];
  if (!allProducts)
    return res
      .status(400)
      .json({ error: "El usuario no tiene productos cargados" });
  const products = allProducts.filter(
    (producto: { state: boolean }) => producto.state === true
  );
  if (Array.isArray(products)) {
    const productDetails = await Promise.all(
      products.map(async (product) => {
        const productFromDB = await Product.findByPk(product.product_id);
        const size = await productFromDB.getSize();
        const sizeValue = size
          ? size.values.find(
              (e: { id: string }) => e.id === productFromDB.size_value
            )
          : null;
        const urlCloudinary = getSecureUrl(product.primary_image, user.user_id);
        const { name, product_id, price, state } = productFromDB;
        return {
          size: sizeValue.value || "-",
          name,
          product_id,
          primary_image: urlCloudinary || "",
          price,
          state,
        };
      })
    );

    return res.status(200).json(
      productDetails.sort((a, b) => {
        if (a.product_id < b.product_id) return -1;
        if (a.product_id > b.product_id) return 1;
        return 0;
      })
    );
  }

  return res.status(400).json({ error: "No hay productos cargados" });
};
