const Task = require('../models/task');
const aqp = require('api-query-params');

const createTaskService = async (data) => {
    let result = null;
    if (data.type === "EMPTY TASK") {
        result = await Task.create(data);
    }
    /*
    {
        "type": "EMPTY TASK",
        "name": "mongodb 6",
        "description": "this is a course learn to mongodb",
        "status": "PENDING",
        "startDate": "22/2/2023",
        "endDate": "22/2/2024"
    }
    */
    if (data.type === "ADD USER") { // add user and project in task
        return await updateTaskService(data);
    }

    return result;
}
const getTaskService = async (data) => {
    let page = data.page;
    const { filter, limit } = aqp(data);
    delete filter.page;
    let skipp = (page - 1) * limit;
    let result = await Task.find(filter).limit(limit).skip(skipp).exec();
    return result;
}
const deleteTaskService = async (id) => {
    let result = await Task.delete({ _id: id });
    return result;
}
const updateTaskService = async (data) => {
    let result = await Task.updateOne({ _id: data.id }, { ...data });
    return result;
}
module.exports = {
    createTaskService, getTaskService, deleteTaskService, updateTaskService
}