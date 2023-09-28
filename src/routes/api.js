const express = require('express');
const { getHomePage, getUsersApi, createUserApi, putUserApi, deleteUserApi,
    postUploadSingleFileApi, postUploadMultipleFilesApi


} = require('../controllers/apiController');

const { createCustomerApi, deleteUsersApi,
    createArrayCustomerApi, getAllUsersApi, updateUserApi,
    deleteArrayCustomerApi
} = require('../controllers/customerController');

const { CreateEmptyProjectApi, getProjectApi, deleteProjectApi,
    updateProjectApi
} = require('../controllers/projectController');


const { createTask, getTask, deleteTask, updateTask } = require('../controllers/taskController');






const routerAPI = express.Router();


routerAPI.get('/', getHomePage);

//CRUD Restfull API
// api user
routerAPI.get('/users', getUsersApi);
routerAPI.post('/users', createUserApi);
routerAPI.put('/users', putUserApi);
routerAPI.delete('/users', deleteUserApi);

// api file
routerAPI.post('/file', postUploadSingleFileApi);
routerAPI.post('/files', postUploadMultipleFilesApi);


//api customer
routerAPI.get('/customers', getAllUsersApi);

routerAPI.post('/customers', createCustomerApi);
routerAPI.post('/customers-many', createArrayCustomerApi);
routerAPI.put('/customers', updateUserApi);
routerAPI.delete('/customers', deleteUsersApi);
routerAPI.delete('/customers-many', deleteArrayCustomerApi);

routerAPI.get('/query', (req, res) => {
    let result = req.query
    return res.status(202).json({
        errorCode: 0,
        dataL: result
    })
});
routerAPI.get('/info/:name/:address/:email', (req, res) => {
    let result = req.params
    return res.status(202).json({
        errorCode: 0,
        dataL: result
    })
});


// API project
routerAPI.post('/projects', CreateEmptyProjectApi);
routerAPI.get('/projects', getProjectApi);
routerAPI.delete('/projects', deleteProjectApi);
routerAPI.put('/projects', updateProjectApi);

//API task


routerAPI.post('/tasks', createTask);
routerAPI.get('/tasks', getTask);
routerAPI.put('/tasks', updateTask);
routerAPI.delete('/tasks', deleteTask);







module.exports = routerAPI;