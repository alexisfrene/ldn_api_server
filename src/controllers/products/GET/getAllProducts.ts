import { Request, Response } from "express";
import { getSecureUrl, models } from "@lib";

const User = models.User;
const Product = models.Product;

export const getAllProducts = async (req: Request, res: Response) => {
  const user_id = req.user;
  const user = await User.findByPk(user_id);
  if (user) {
    const allProducts = await user.getUserProducts();
    if (!allProducts)
      res.status(400).json({ error: "El usuario no tiene productos cargados" });
    const products = allProducts.filter(
      (producto: { state: boolean }) => producto.state === true
    );
    if (Array.isArray(products)) {
      const productDetails = await Promise.all(
        products.map(async (product) => {
          const productFromDB = await Product.findByPk(product.product_id);
          if (productFromDB) {
            const size = await productFromDB.getSizeProducts();
            const sizeValue = size
              ? size.values.find((e) => e.id === productFromDB.size_value)
              : null;
            const urlCloudinary = getSecureUrl(
              product.primary_image,
              user.user_id
            );
            const { name, product_id, price, state } = productFromDB;
            return {
              size: sizeValue?.value || "-",
              name,
              product_id,
              primary_image: urlCloudinary || "",
              price,
              state,
            };
          } else {
            return {
              size: "-",
              name: "-",
              product_id: "-",
              primary_image: "-",
              price: 1,
              state: false,
            };
          }
        })
      );

      res.status(200).json(
        productDetails.sort((a, b) => {
          if (a.product_id < b.product_id) return -1;
          if (a.product_id > b.product_id) return 1;
          return 0;
        })
      );
    }

    res.status(400).json({ error: "No hay productos cargados" });
  }
  res.status(400).json({ error: "Usuario no registrado" });
};
