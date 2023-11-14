exports.updateProduct = (req, res) => {
  const productId = req.params.id;
  res.send(`Producto con ID ${productId} actualizado`);
};
