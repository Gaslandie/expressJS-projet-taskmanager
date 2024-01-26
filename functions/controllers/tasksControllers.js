const asyncWrapper = require('../middleware/async')
const Task = require('../models/tasks')
const {createCustomError} = require('../errors/costum-error')

//controlleur pour recuperer toutes les taches
const getAllTasks =asyncWrapper(async (req,res)=>{
    const tasks = await Task.find({})
    res.status(200).json({ tasks })
}) 
//pour creer un tache
const createTask =asyncWrapper(async(req,res)=>{
    const task = await Task.create(req.body)
    res.status(201).json({task})
}) 
        
   
//recuperer une tache
const getTask = asyncWrapper(async (req,res,next)=>{
    
        const {id:taskID} = req.params 
        const task = await Task.findOne({_id:taskID})
        if(!task){
            return next(createCustomError(`no task with id:${taskID}`,404))
        }
        res.status(200).json({task})
    })

//supprimer une tache
const deleteTask = asyncWrapper( async (req,res,next)=>{
        const {id:taskID} = req.params
        const task = await Task.findOneAndDelete({_id:taskID})
        if(!task){
            return next(createCustomError(`no task with id:${taskID}`,404))
        }
        res.status(200).json({task})   
})
//mettre à jour une tache
const updateTask = asyncWrapper(async (req,res,next)=>{
        const {id:taskID} = req.params;
        const task = await Task.findOneAndUpdate({_id:taskID},req.body,{new:true,runValidators:true})
        if(!task){
            return next(createCustomError(`no task with id:${taskID}`,404))
        }
        res.status(200).json({task})
})

module.exports = {
    getAllTasks,
    createTask,
    getTask,
    updateTask,
    deleteTask
}