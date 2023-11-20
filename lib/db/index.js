const Sequelize = require("sequelize");

const sequelize = new Sequelize(
  "ldn_image_manager",
  "postgres",
  "789456258266Aa",
  {
    host: "localhost",
    dialect: "postgres",
    port: 4000,
    logging: true,
  }
);

const connectSequelize = async () => {
  sequelize
    .authenticate()
    .then(() => {
      console.log("Conexión a la base de datos establecida correctamente.");
    })
    .catch((err) => {
      console.error("Error al conectar a la base de datos:", err);
    });

  sequelize.sync({ force: false }).then(() => {
    console.log("Modelo de usuario sincronizado con la base de datos.");
  });
};

module.exports = { connectSequelize, sequelize };
