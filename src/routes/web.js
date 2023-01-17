const express = require('express');
const { getHomePage, getName, postCreateUsers, getCreate,
    getUpdate, postUpdateUsers, postDeleteUser, postHandleRemoveUser } = require('../controllers/homeController');
const router = express.Router();


//router.method('route',handler)
router.get('/', getHomePage);
router.get('/name', getName);
router.get('/create', getCreate);
router.get('/update/:id', getUpdate);

router.post('/create-users', postCreateUsers);
router.post('/update-users', postUpdateUsers);

router.post('/delete-user/:id', postDeleteUser);
router.post('/delete-user', postHandleRemoveUser);

module.exports = router;