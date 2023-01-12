const express = require('express');
const { getHomePage, getName, postCreateUsers } = require('../controllers/homeController');
const router = express.Router();


//router.method('route',handler)
router.get('/', getHomePage);
router.get('/name', getName);
router.post('/create-users', postCreateUsers);
module.exports = router;