const Producto = require("../models/producto.model");

//! Crear y guardar un nuevo producto
exports.create = (req, res) => {
  const producto = new Producto({
    nombre: req.body.nombre,
    categoria: req.body.categoria,
    precio: req.body.precio,
    cantidad: req.body.cantidad,
  });

  producto
    .save()
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al crear el producto.",
      });
    });
};

//! Obtener todos los productos
exports.findAll = (req, res) => {
  Producto.find()
    .then((productos) => {
      res.send(productos);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al obtener los productos.",
      });
    });
};

//! Obtener un solo producto por id
exports.findOne = (req, res) => {
  Producto.findById(req.params.id)
    .then((producto) => {
      if (!producto) {
        return res.status(404).send({
          message: "Producto no encontrado con id " + req.params.id,
        });
      }
      res.send(producto);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Producto no encontrado con id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error al obtener el producto con id " + req.params.id,
      });
    });
};

//! Actualizar un producto por id
exports.update = (req, res) => {
  let updates = {};

  if (req.body.nombre) {
    updates.nombre = req.body.nombre;
  }
  if (req.body.categoria) {
    updates.categoria = req.body.categoria;
  }
  if (req.body.precio) {
    updates.precio = req.body.precio;
  }
  if (req.body.cantidad) {
    updates.cantidad = req.body.cantidad;
  }

  console.log(updates)

  Producto.findByIdAndUpdate(
    req.params.id,
    updates,
    { new: true }
  )
    .then((producto) => {
      if (!producto) {
        return res.status(404).send({
          message: "Producto no encontrado con id " + req.params.id,
        });
      }
      res.send(producto);
    })
    .catch((err) => {
      if (err.kind === "ObjectId") {
        return res.status(404).send({
          message: "Producto no encontrado con id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "Error al actualizar el producto con id " + req.params.id,
      });
    });
};

//! Eliminar un producto por id
exports.delete = (req, res) => {
  Producto.findByIdAndDelete(req.params.id)
    .then((producto) => {
      if (!producto) {
        return res.status(404).send({
          message: "Producto no encontrado con id " + req.params.id,
        });
      }
      res.send({ message: "Producto eliminado exitosamente!" });
    })
    .catch((err) => {
      if (err.kind === "ObjectId" || err.name === "NotFound") {
        return res.status(404).send({
          message: "Producto no encontrado con id " + req.params.id,
        });
      }
      return res.status(500).send({
        message: "No se pudo eliminar el producto con id " + req.params.id,
      });
    });
};

//! Obtener productos por categoría
exports.findByCategory = (req, res) => {
  Producto.find({ categoria: req.params.categoria })
    .then((productos) => {
      if (productos.length === 0) {
        return res.status(404).send({
          message: "No se encontraron productos en la categoría " + req.params.categoria,
        });
      }
      res.send(productos);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || "Error al obtener los productos por categoría.",
      });
    });
};
