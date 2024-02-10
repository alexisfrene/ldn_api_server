import { app } from "./app";
import dotenv from "dotenv";
dotenv.config();
const PORT = process.env.PORT || 3210;
app.listen(PORT, () => {
  console.log(`Servidor en ejecución en http://localhost:${PORT}`);
});
