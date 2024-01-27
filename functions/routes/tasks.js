/* eslint-disable new-cap */
/* eslint-disable max-len */
const express = require("express");
const router = express.Router();
const {getAllTasks, createTask, getTask, updateTask, deleteTask}=require("../controllers/tasksControllers"); // destructuration

router.route("/").get(getAllTasks).post(createTask);// pas besoin de id
router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);// on a besoin de l'id pour ces operations

module.exports = router;
