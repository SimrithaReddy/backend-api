const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
    inventory_id:{type:Number, required:true, unique:true},
    inventoryType : {type: String, required:true},
    itemName:{type:String, required:true},
    Availability:{type:Number, required:true}
})

const inventory = mongoose.model('inventorySchema',inventorySchema);

module.exports = inventory;