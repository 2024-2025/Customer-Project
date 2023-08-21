const express=require('express');
const { StoreValidation, StoreModel } = require('../Model/Store');
const { ItemModel } = require('../Model/Item');
const router=express.Router();

router.get('/',async(req,res)=>{
 const ItemData=await StoreModel.find().populate({
    path:"ItemID",
    module:"item",
    select:"-_id ItemName"
 })
 res.send(ItemData)
})



router.post('/',async(req,res)=>{
    try {
    
    let {error}=StoreValidation(req.body);
    if(error) return res.send(error.message);

  

    
    const Store=new StoreModel((req.body))

    const ItemData=await ItemModel.findOne({_id:req.body.ItemID});
    if(!ItemData) return res.send('ItemData lama helin')

   
    const Total=Store.Quantity*Store.price;
   
    

   const Balance=ItemData.Balance+Total;
  
   await ItemModel.findByIdAndUpdate(req.body.ItemID,({
    Balance:Balance
   }))
   
   
    const info=await Store.save();
    res.send({
        status:"Success",
        message:"Successfully Inserted Data Store",
        info:info
        
    })
    
        
    } catch (error) {
        res.send(error.message)
    }
    })

   
    
module.exports=router