const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
    custom_id:{type:Number},
    invent_id:{type:Number},
    itemName:{type:String},
    Quantity:{type:Number}
})

const order = mongoose.model('ord',orderSchema);

module.exports = order;