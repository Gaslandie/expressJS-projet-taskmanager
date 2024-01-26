const mongoose = require('mongoose')
require('dotenv').config();

const connectionString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}?retryWrites=true&w=majority`;
//connection à la base de données
const connectDB = ()=>{
  return  mongoose.connect(connectionString)
}

module.exports = connectDB      

        