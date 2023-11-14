const express = require("express");
const cors = require("cors");
const app = express();
const { connectSequelize } = require("./lib/db");
const productRoutes = require("./routes/productRoutes");
require("dotenv").config();
const PORT = process.env.PORT || 3210;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/uploads", express.static("public/uploads"));
app.use("/optimize", express.static("public/optimize"));
app.use("/api", productRoutes);

connectSequelize();

app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
