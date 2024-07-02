const express = require("express");
const router = express.Router();
const productoController = require("../controllers/producto.controller");

//* Crear un nuevo producto
router.post("/productos", productoController.create);

//* Obtener todos los productos
router.get("/productos", productoController.findAll);

//* Obtener un producto por id
router.get("/producto/:id", productoController.findOne);

//* Obtener productos por categoría
router.get("/productos/categoria/:categoria", productoController.findByCategory);

//* Actualizar un producto por id
router.put("/productos/actualizar/:id", productoController.update);

//* Eliminar un producto por id
router.delete("/producto/eliminar/:id", productoController.delete);

module.exports = router;
