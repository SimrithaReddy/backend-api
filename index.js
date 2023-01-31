const express = require('express');
const mongoose = require('mongoose');
const inv = require('./models/inventory');
const cust = require('./models/customer');
const ord = require('./models/order');
mongoose.set('strictQuery', false);

const app = express();

app.use(express.json())
app.get('/',(req,res)=>{
  res.send("Hello")
})

app.post('/createInventory',async(req,res)=>{
  try{
    let invent = await inv.create({
      inventory_id:req.body.inventory_id,
    inventoryType : req.body.inventoryType,
    itemName:req.body.itemName,
    Availability:req.body.Availability
    })
    res.send(invent)
  }catch(e){
    res.status(400).send(e.message)
  }
})

app.post('/createCustomer',async(req,res)=>{
  try{
    let createCust = await cust.create({
      customer_id:req.body.customer_id,
    customerEmail : req.body.customerEmail,
    customerName:req.body.customerName
    })
    res.send(createCust)
  }catch(e){
    res.status(400).send(e.message)
  }
})

app.post('/createOrders',async(req,res)=>{
  try{

    let find_custId  = await cust.find({customer_id:req.body.customer_id})
    let invId_find = await inv.find({inventory_id:req.body.inventory_id})
    
    if(find_custId.length===0||invId_find.length===0){
      return res.send("Invalid customer id or inventory id")
    }
    
    if(!(invId_find[0].itemName=== req.body.itemName)) return res.send("Check Item Name");
    if(invId_find[0].Availability===0) return res.send("ITEM IS OUT OF STOCK")
    else if(invId_find[0].Availability>req.body.Quantity|| invId_find[0].Availability===req.body.Quantity){
    let createCust = await ord.create({
      customer_id:req.body.customer_id,
    inventory_id:req.body.inventory_id,
    itemName:req.body.itemName,
    Quantity:req.body.Quantity
    })
    
    let up = await inv.updateOne({inventory_id:req.body.inventory_id, $set: {Availability:invId_find[0].Availability-req.body.Quantity}})
    res.send(createCust)
    }
    else{
      res.send("Item is out of Stock")
    }
  }catch(e){
    res.status(400).send(e.message)
  }
})


app.get('/orders',async(req,res)=>{
  try{
    let get_orders = await ord.find()
    res.send(get_orders)
  }catch(e){
    res.status(400).send(e.message)
  }
})

app.get('/inventory',async(req,res)=>{
  try{
    let get_inventory = await inv.find()
    res.send(get_inventory)
  }catch(e){
    res.status(400).send(e.message)
  }
})

app.get('/customerDetails',async(req,res)=>{
  try{
    let get_customerDetails = await cust.find()
    res.send(get_customerDetails)
  }catch(e){
    res.status(400).send(e.message)
  }
})

app.get('/inventory/inventoryType',async(req,res)=>{
  try{
    const res = req.params;
    res.send("Ok")
  }catch(e){
    res.status(400).send(e.message)
  }
})







mongoose.connect("mongodb+srv://Simritha_Reddy_k04:simritha123@cluster0.ppxra6j.mongodb.net/?retryWrites=true&w=majority", { useNewUrlParser: true, useUnifiedTopology: true },
    () => {
      console.log("connected to DB");
    }
  );
  
  app.listen(5000, () => {
    console.log("server is up at port 5000")
  }) 