const mongoose = require('mongoose')
require('dotenv').config();

const connectionString = process.env.MONGO_URI
//connection à la base de données
// const connectDB = ()=>{
//   return  mongoose.connect(connectionString)
// }
const connectDB = async () => {
  try {
    await mongoose.connect(connectionString);
    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);
    process.exit(1); // Quitter l'application en cas d'échec de la connexion
  }
};


module.exports = connectDB      

        