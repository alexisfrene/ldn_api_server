import { Request, Response } from "express";
import db from "../../../lib/sequelize";
import { getSecureUrl } from "../../../lib";

const User = db.User;
const Product = db.Product;
const Category = db.Category;

export const getAllProducts = async (req: Request, res: Response) => {
  const user_id = req.user;
  try {
    const user = await User.findByPk(user_id || "");
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    const allProducts = user?.getProducts() ? await user.getProducts() : [];
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
          const urlCloudinary = getSecureUrl(
            product.primary_image,
            user.user_id
          );
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
  } catch (error) {
    console.error("Error in getProducts:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getImageProduct = async (req: Request, res: Response) => {
  try {
    const user_id = req.user;
    const query = req.query;
    if (!user_id) return res.status(400).json({ error: "Falta user_id" });
    if (!query.public_id)
      return res.status(400).json({ error: "Falta public_id" });
    if (typeof query.public_id !== "string")
      return res.status(400).json({ error: "public_id invalido" });
    const image_url = getSecureUrl(query.public_id, user_id);

    if (!image_url) {
      return res.status(400).json({ error: "Invalid image URL" });
    }

    return res.status(200).json(image_url);
  } catch (error) {
    console.error("Error in getImageProduct:", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

export const getProductById = async (req: Request, res: Response) => {
  const productId = req.params.id;
  const user_id = req.user;
  try {
    if (!user_id) return res.status(400).json({ error: "Falta user_id" });
    if (!productId)
      return res
        .status(400)
        .json({ error: true, message: "No se paso un id de producto" });
    const product = await Product.findByPk(productId);
    if (!product)
      return res
        .status(400)
        .json({ error: true, message: "No se encontró producto" });

    const category = await product.getCategory();
    const categoryValue = category
      ? category.values.find(
          (e: { id: string }) => e.id === product.category_value
        )
      : null;
    const size = await product.getSize();
    const sizeValue = size
      ? size.values.find((e: { id: string }) => e.id === product.size_value)
      : null;

    const detail = await product.getDetail();
    const urlCloudinary = getSecureUrl(product.primary_image, user_id);
    let variationFormat = {
      variation_id: "",
      title: "",
      values: [] as { id: string; label: string; images: string[] }[],
    };
    const variations = await product.getVariation();

    if (variations) {
      variationFormat.title = variations.title;
      variationFormat.variation_id = variations.variation_id;
      variations.values.forEach(
        (value: { id: string; label: string; images: string[] }) => {
          variationFormat.values.push({
            id: value.id,
            label: value.label,
            images: value.images.map(
              (image: string) =>
                getSecureUrl(`variations/${image}`, user_id) || ""
            ),
          });
        }
      );
    }

    const {
      name,
      product_id,
      description,
      price,
      state,
      code,
      stock,
      discount,
    } = product;

    return res.status(200).json({
      category: categoryValue?.value || null,
      detail,
      size: sizeValue?.value || null,
      name,
      product_id,
      description,
      primary_image: urlCloudinary || "",
      price,
      state,
      code,
      stock,
      discount,
      variation: variationFormat,
    });
  } catch (error) {
    return res
      .status(400)
      .json({ error: true, message: "Error al buscar el producto" });
  }
};

export const getProductForCategory = async (req: Request, res: Response) => {
  const { category_id, category_value } = req.query;
  const user_id = req.user;
  try {
    const user = await User.findByPk(user_id || "");
    const products = user?.getProducts() ? await user.getProducts() : [];
    if (!products)
      return res.status(400).json({
        error: true,
        message: "El usuario no tiene productos cargados",
      });
    const category = await Category.findByPk(category_id || "");
    console.log(category);
    if (!category)
      return res
        .status(400)
        .json({ error: true, message: "Categoría no encontrado" });
    const categoryValue = category?.values.find(
      (value: { id: string }) => value.id === category_value
    );
    if (!categoryValue)
      return res.status(400).json({
        error: true,
        message: "No se encontró el valor de la categoría",
      });
    const productsForCAtegory = products.filter(
      (product: { category_id: string; category_value: string }) =>
        product.category_id === category_id &&
        product.category_value === category_value
    );
    return res.status(200).json({ res: productsForCAtegory });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: true, message: "Error al buscar los productos" });
  }
};
