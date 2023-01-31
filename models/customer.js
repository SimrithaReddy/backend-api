const mongoose = require('mongoose');

const customerSchema = new mongoose.Schema({
    customer_id:{type:Number, required:true, unique:true},
    customerEmail : {type: String, required:true, unique:true},
    customerName:{type:String, required:true}
})

const customer = mongoose.model('cust',customerSchema);

module.exports = customer;