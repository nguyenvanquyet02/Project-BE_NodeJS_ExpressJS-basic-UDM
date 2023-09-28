const mongoose = require('mongoose');
// soft delete 
const mongooseDelete = require('mongoose-delete');


const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    image: String,
    address: String,
    phone: String,
    description: String,

}, {
    timestamps: true,

});
customerSchema.plugin(mongooseDelete, { overrideMethods: 'all' });
const Customer = mongoose.model('customer', customerSchema);
module.exports = Customer;