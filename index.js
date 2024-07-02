const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const createError = require("http-errors");

//? Conexión de la base de datos
mongoose
  .connect("mongodb+srv://pabor:objp0174@cluster0.u65t8p4.mongodb.net/")
  .then((x) => {
    console.log(
      `Conectado exitosamente a la base de datos: ${x.connections[0].name}`
    );
  })
  .catch((error) => {
    console.log("Error de conexión", error.reason);
  });

//? Configuración de servidor web
const productoRouter = require("./routes/productos.routes");
const app = express();

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);

app.use(cors());
app.use("/api", productoRouter);

//? Habilitar el puerto
const port = process.env.PORT || 4000;
const server = app.listen(port, () => {
  console.log("Servidor escuchando en el puerto " + port);
});

//? Manejador de error 404
app.use((req, res, next) => {
  next(createError(404));
});

//? Manejador de errores
app.use(function (err, req, res, next) {
  console.log(err.message);
  if (!err.statusCode) err.statusCode = 500;
  res.status(err.statusCode).send(err.message);
});
