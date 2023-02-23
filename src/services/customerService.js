const Customer = require('../models/customer');

const aqp = require('api-query-params');
const createCustomerService = async (customerData) => {
    try {
        let result = await Customer.create({
            name: customerData.name,
            email: customerData.email,
            image: customerData.image,
            address: customerData.address,
            phone: customerData.phone,
            description: customerData.description
        })
        return result;
    } catch (error) {
        console.log(error)
    }
}
const createArrayCustomersService = async (arr) => {
    try {
        let result = await Customer.insertMany(arr);
        return result;
    } catch (error) {
        console.log(error)

    }
}
const getAllUsersSercive = async (limit, page, queryString) => {
    let result = null;
    let skipp = (page - 1) * limit;
    try {
        if (limit && page) {
            const { filter } = aqp(queryString);// /name/ $regex 
            delete filter.page;
            console.log('===> check filter: ', filter);
            result = await Customer.find(filter).skip(skipp).limit(limit).exec();
        } else {
            result = await Customer.find({});
        }
        return result;
    } catch (error) {
        console.log('==>error: ', error);
    }

}
const deleteCustomerService = async (userId) => {
    try {
        let result = await Customer.deleteById({ _id: userId });
        return result;
    } catch (error) {
        console.log(error)
    }
}
const deleteArrCustomerService = async (arrCustomerId) => {
    try {
        let result = await Customer.delete({ _id: { $in: arrCustomerId } })
        return result;
    } catch (error) {
        console.log(error)
    }
}
module.exports = {
    createCustomerService, createArrayCustomersService,
    getAllUsersSercive, deleteCustomerService,
    deleteArrCustomerService
}