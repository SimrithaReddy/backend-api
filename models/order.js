const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    customer_id:{type:Number, required:true},
    inventory_id:{type:Number, required:true},
    itemName:{type:String, required:true},
    Quantity:{type:Number,required:true}
})

const order = mongoose.model('customerSchema',orderSchema);

module.exports = order;