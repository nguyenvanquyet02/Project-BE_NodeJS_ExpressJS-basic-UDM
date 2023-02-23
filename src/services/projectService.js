const Project = require('../models/project');
const aqp = require('api-query-params');




const createProjectService = async (reqBody) => {
    let result = null;
    if (reqBody.type === "EMPTY PROJECT") {
        result = await Project.create(reqBody);
    }
    /*
        {
            "type": "EMPTY PROJECT",
            "name": "new project",
            "startDate": "21/2/2023",
            "endDate": "21/2/2024",
            "description": "by CEO.Maris",
            "customerInfor": {
                "name": "Nguyen Van Quyet",
                "phone": "5436534767",
                "email": "customer@gmail.com"
            },
            
            "leader": {
                "name": "leader user",
                "email": "leader@gmail.com"
            }
        } 
    */

    if (reqBody.type === "ADD USER") {

        let myProject = await Project.findById(reqBody.projectId).exec();
        for (let i = 0; i < reqBody.userArr.length; i++) {
            myProject.usersInfor.push(reqBody.userArr[i]);
        }
        let newResult = await myProject.save();
        return newResult;
        /*
        {
            "type": "ADD USER",
            "projectId": "63f5e71685693ad0b5e988ad",
            "userArr":[
                "63e904bcb3d195159f523353",
                "63eb99998f39a64ad1641820",
                "63eb99af8f39a64ad1641823"
            ]
        }
        */
    }
    if (reqBody.type === "REMOVE USER") {
        let myProject = await Project.findById(reqBody.projectId).exec();
        for (let i = 0; i < reqBody.userArr.length; i++) {
            myProject.usersInfor.pull(reqBody.userArr[i]);
        }
        result = await myProject.save();
    }
    if (reqBody.type === "ADD TASK") {
        let myProject = await Project.findById(reqBody.projectId).exec();
        for (let i = 0; i < reqBody.taskArr.length; i++) {
            myProject.tasks.push(reqBody.taskArr[i]);
        }
        result = await myProject.save();
        /*
            {
            "type": "ADD TASK",
            "projectId": "63f5e71685693ad0b5e988ad",
            "taskArr":[
                "63f634b52b8abde87d8ec670",
                "63f634b82b8abde87d8ec672",
                "63f634bc2b8abde87d8ec674"
            ]
        }
        */
    }
    return result;
}
const getProjectService = async (data) => {
    let page = data.page;
    const { filter, limit, population } = aqp(data);// /name/ $regex 
    delete filter.page;
    let skipp = (page - 1) * limit;
    // population get usersInfor by id (ref)
    let result = await Project.find(filter)
        .populate(population)
        .skip(skipp)
        .limit(limit)
        .exec();


    return result;
}
const deleteProjectService = async (data) => {
    let result = null;
    if (data) {
        result = await Project.delete({ _id: data.projectId });
    }
    return result;
}

const updateProjectService = async (data) => {
    let result = await Project.updateOne({ _id: data.projectId }, { ...data });
    return result;
}
module.exports = {
    createProjectService, getProjectService, deleteProjectService,
    updateProjectService
}