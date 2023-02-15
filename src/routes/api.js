const express = require('express');
const { getHomePage, getUsersApi, createUserApi, putUserApi, deleteUserApi } = require('../controllers/apiController');
const router = express.Router();


router.get('/', getHomePage);

//CRUD Restfull API

router.get('/users', getUsersApi);
router.post('/users', createUserApi);
router.put('/users', putUserApi);
router.delete('/users', deleteUserApi);




module.exports = router;