
const User = require('../models/user');
const { uploadSingleFile, uploadMultipleFiles } = require('../services/fileService');

const getHomePage = async (req, res, next) => {
    title = 'hello world with the first project BE rest api';
    res.status(200).json({
        errorCode: 0,
        data: title
    })
}
const getUsersApi = async (req, res, next) => {
    let users = await User.find({});
    return res.status(201).json({
        errorCode: 0,
        data: users
    })
}
const createUserApi = async (req, res, next) => {
    let { email, name, city } = req.body;
    let user = await User.create({ name, email, city })
    res.status(201).json({
        errorCode: 0,
        data: user
    })
}
const putUserApi = async (req, res, next) => {
    let { userId, name, email, city } = req.body;
    let user = await User.updateOne({ _id: userId }, { name, email, city })
    res.status(202).json({
        errorCode: 0,
        data: user
    })
}
const deleteUserApi = async (req, res) => {
    let userId = req.body.userId;
    let results = await User.deleteOne({ _id: userId });
    res.status(202).json({
        errorCode: 0,
        data: results
    })
}
const postUploadSingleFileApi = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');

    }
    let result = await uploadSingleFile(req.files.image);
    return res.status(202).json({
        errorCode: 0,
        data: result
    })
}
const postUploadMultipleFilesApi = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    if (Array.isArray(req.files.image)) {
        let result = await uploadMultipleFiles(req.files.image);
        return res.status(202).json({
            errorCode: 0,
            data: result
        })
    }
    else {
        return await postUploadSingleFileApi(req, res);
    }
}

module.exports = {
    getHomePage, getUsersApi, createUserApi, putUserApi,
    deleteUserApi, postUploadSingleFileApi, postUploadMultipleFilesApi
}