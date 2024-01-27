/* eslint-disable max-len */
const express = require("express");
const tasks = require("./routes/tasks");
const app = express();
require("dotenv").config; // chargement des variables d'environnement
const connectDB =require("./db/connection");

// notFound et gestion d'erreur
const notFound = require("./middleware/not-found");
const errorHandlerMiddleware = require("./middleware/error-handler");


// nos middlewares
app.use(express.static("../public")); // le contenu à afficher au front-end
app.use(express.json()); // midlleware pour traiter les requetes json


// nos routes
app.use("/api/v1/tasks", tasks);


app.use(notFound);
app.use(errorHandlerMiddleware);
const port = process.env.PORT || 5000;

const start = async () =>{
  try {
    await connectDB(); // attendre la connexion à la base de donnée avant d'ecouter le port et afficher server is listening...
    app.listen(port, ()=>console.log(`server is listening on port ${port}`));
  } catch (error) {
    console.log(error);
  }
};

start(); // on demarre
