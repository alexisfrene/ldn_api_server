import { runMigrations } from "./migrate";

runMigrations().catch((error) => {
  console.error("Error ejecutando migraciones:", error);
});
