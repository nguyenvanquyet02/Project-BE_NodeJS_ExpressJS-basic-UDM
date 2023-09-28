const { uploadSingleFile } = require('../services/fileService');
const { createCustomerService, createArrayCustomersService,
    getAllUsersSercive, deleteCustomerService,
    deleteArrCustomerService
} = require('../services/customerService');
const Customer = require('../models/customer');
const Joi = require('joi');


const createCustomerApi = async (req, res) => {
    let { name, email, address, phone, description } = req.body;
    const schema = Joi.object({
        name: Joi.string()
            .min(3)
            .max(50)
            .required(),
        phone: Joi.string()
            .pattern(new RegExp('^[0-9]{8,11}$')).required(),
        email: Joi.string().email().required(),
        address: Joi.string().required(),
        description: Joi.string()
            .min(3)
            .max(500)
            .required(),
    })
    let { error } = schema.validate(req.body, { abortEarly: true });
    if (error) {
        return res.status(202).json({
            errorCode: -1,
            data: error
        })
    }
    else {
        if (!req.files || Object.keys(req.files).length === 0) {
        }
        else {
            let result = await uploadSingleFile(req.files.image);
            let customerData = {
                name,
                email,
                image: result.path,
                address,
                phone,
                description,
            }
            let customer = await createCustomerService(customerData)
            return res.status(202).json({
                errorCode: 0,
                data: customer
            })
        }
        res.send('create successfully');
    }
}
const createArrayCustomerApi = async (req, res) => {
    let result = await createArrayCustomersService(req.body.customers);
    if (result) {
        return res.status(202).json({
            errorCode: 0,
            data: result
        })
    } else {
        return res.status(202).json({
            errorCode: -1,
            data: result
        })
    }
}
const getAllUsersApi = async (req, res) => {
    let { limit, page } = req.query;
    let result = null;
    if (limit && page) {
        result = await getAllUsersSercive(limit, page, req.query);
    }
    else {
        result = await getAllUsersSercive();
    }
    if (result) {
        return res.status(202).json({
            errorCode: 0,
            data: result
        })
    }
    else {
        return res.status(202).json({
            errorCode: -1,
            data: result
        })
    }
}
const updateUserApi = async (req, res) => {
    let { userId, name, email, image, address, phone, description } = req.body;

    let result = await Customer.updateOne({ _id: userId }, { name, email, image, address, phone, description });
    if (result) {
        return res.status(202).json({
            errorCode: 0,
            data: result
        })
    }
    else {
        return res.status(202).json({
            errorCode: -1,
            data: result
        })
    }
}
const deleteUsersApi = async (req, res) => {
    let userId = req.body.userId;
    let result = await deleteCustomerService(userId);
    if (result) {
        return res.status(202).json({
            errorCode: 0,
            data: result
        })
    } else {
        return res.status(202).json({
            errorCode: -1,
            data: result
        })
    }
}
const deleteArrayCustomerApi = async (req, res) => {
    let arrCustomerId = req.body.arrCustomerId;

    let result = await deleteArrCustomerService(arrCustomerId);
    if (result) {
        return res.status(202).json({
            errorCode: 0,
            data: result
        })
    } else {
        return res.status(202).json({
            errorCode: -1,
            data: result
        })
    }
}
module.exports = {
    createCustomerApi, createArrayCustomerApi,
    getAllUsersApi, updateUserApi, deleteUsersApi,
    deleteArrayCustomerApi
}