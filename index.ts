import { app } from "./src/app";
import dotenv from "dotenv";
import { sequelize } from "./src/lib";
import "./src/lib/sequelize/models/Categories";
import "./src/lib/sequelize/models/ProductDetails";
import "./src/lib/sequelize/models/Products";
import "./src/lib/sequelize/models/Settings";
import "./src/lib/sequelize/models/Sizes";
import "./src/lib/sequelize/models/Users";

dotenv.config();
const PORT = process.env.PORT || 3210;
const main = async () => {
  try {
    sequelize.sync({ force: true });
    app.listen(PORT, () => {
      console.log(`Servidor en ejecución en http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Error");
  }
};
main();
