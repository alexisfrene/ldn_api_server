import { env } from "config/environment";

export const getImageProductService = async (
  user_id: string,
  query: any,
  req: any,
) => {
  if (!user_id) return { status: 400, body: { error: "Falta user_id" } };
  if (!query.public_id)
    return { status: 400, body: { error: "Falta public_id" } };
  if (typeof query.public_id !== "string")
    return { status: 400, body: { error: "public_id invalido" } };
  const image_url = `${
    env === "production" ? "https" : req.protocol
  }://${req.get("host")}/api/products/images/${query.public_id.replace(
    /\.[^/.]+$/,
    "",
  )}`;

  if (!image_url) {
    return { status: 400, body: { error: "Invalid image URL" } };
  }

  return { status: 200, body: image_url };
};
