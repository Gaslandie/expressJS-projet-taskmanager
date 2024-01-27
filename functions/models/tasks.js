/* eslint-disable max-len */
const mongoose = require("mongoose"); // notre architect pour utiliser mongoDB


// le schemas de nos données
const TaskSchema =new mongoose.Schema({
  name: {
    type: String,
    required: [true, "must provide name"],
    trim: true,
    maxlength: [20, "name cant be more than 20 charac"],
  },
  completed: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("task", TaskSchema); // donc on aura un modele avec nom task dans notre base de donnée avec pour schema TaskSchema
