# Convenciones de Nombres y Relaciones en Sequelize

Este documento detalla las convenciones de nombres y las relaciones que utilizamos en nuestro proyecto de Sequelize para asegurar la claridad y la consistencia en el código.

## Convención de Nombres

### 1. Modelos

- **Nombre del modelo**: Singular.
  - Ejemplo: `Category`, `User`, `Product`.

### 2. Tablas

- **Nombre de la tabla**: Plural.
  - Ejemplo: `Categories`, `Users`, `Products`.

### 3. Relaciones

- Para las relaciones **1:N** (uno a muchos):
  - **Alias**: Padre en singular seguido de hijo en plural.
  - Ejemplo: `UserCategories` (un usuario tiene muchas categorías).
- Para las relaciones **1:1** (uno a uno):
  - **Alias**: Padre en singular seguido de hijo en singular.
  - Ejemplo: `ProductDetail` (un producto tiene un detalle).

## Ejemplos de Relaciones en Sequelize

### 1. Relaciones 1:N

```javascript
// Un usuario puede tener muchas categorías
User.hasMany(models.Category, {
  as: "UserCategories", // Alias: El usuario tiene muchas categorías
  foreignKey: "user_id",
});

Category.belongsTo(models.User, {
  as: "CategoryUser", // Alias: La categoría pertenece a un usuario
  foreignKey: "user_id",
});
```
