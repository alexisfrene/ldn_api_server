import { runMigrations } from "./migrate";

(async () => {
  await runMigrations();
  process.exit(0);
})();
