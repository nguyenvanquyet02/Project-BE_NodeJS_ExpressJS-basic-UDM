const { createTaskService,
    getTaskService, deleteTaskService, updateTaskService
} = require('../services/taskService');
const Joi = require('joi');

const createTask = async (req, res) => {
    const schema = Joi.object({
        name: Joi.string()
            .max(50)
            .required(),
        email: Joi.string().email(),
        city: Joi.string(),
    })
    let { error } = schema.validate(req.body, { abortEarly: true });
    if (error) {
        return res.status(202).json({
            errorCode: -1,
            data: error
        })
    }
    else {
        let result = await createTaskService(req.body);
        return res.status(202).json({
            errorCode: 0,
            data: result
        })
    }

}
const getTask = async (req, res) => {
    let result = await getTaskService(req.query);
    return res.status(202).json({
        errorCode: 0,
        data: result
    })
}
const updateTask = async (req, res) => {
    let result = await updateTaskService(req.query);
    return res.status(202).json({
        errorCode: 0,
        data: result
    })
}
const deleteTask = async (req, res) => {
    let result = await deleteTaskService(req.body.id);
    return res.status(202).json({
        errorCode: 0,
        data: result
    })
}
module.exports = {
    createTask, getTask, updateTask, deleteTask
}