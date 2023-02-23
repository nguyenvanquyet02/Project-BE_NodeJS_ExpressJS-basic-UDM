const { createProjectService, getProjectService,
    deleteProjectService, updateProjectService,

} = require('../services/projectService');
const Joi = require('joi');



const CreateEmptyProjectApi = async (req, res) => {

    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(50)
            .required(),
        startDate: Joi.string(),
        endDate: Joi.string(),
        description: Joi.string()
    })
    const { error } = schema.validate(req.body, { abortEarly: true });
    if (error) {
        return res.status(202).json({
            errorCode: -1,
            data: error
        })
    }
    else {
        let result = await createProjectService(req.body);
        return res.status(202).json({
            errorCode: 0,
            data: result
        })
    }
}
const getProjectApi = async (req, res) => {
    let result = await getProjectService(req.query);
    return res.status(202).json({
        errorCode: 0,
        data: result
    })
}
const deleteProjectApi = async (req, res) => {
    let data = req.body;
    let result = await deleteProjectService(data);
    return res.status(202).json({
        errorCode: 0,
        data: result
    })
}
const updateProjectApi = async (req, res) => {
    let result = await updateProjectService(req.body);
    return res.status(202).json({
        errorCode: 0,
        data: result
    })
}
module.exports = {
    CreateEmptyProjectApi, getProjectApi, deleteProjectApi,
    updateProjectApi
}