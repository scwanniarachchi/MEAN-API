const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId

var { Cart } = require('../models/Cart')
var { Item } = require('../models/Item')

router.get('/',(request,response)=>{
    Cart.find((error,results_data)=>{
        if(!error){
            response.send(results_data)
        }else{
            console.log(JSON.stringify(error,undefined,2))
        }
    })
})

router.get('/:id',async(req,res)=>{
    await Item.aggregate([
        { "$addFields": { "item_id": { "$toString": "$_id" }}},
        { "$lookup": {
            "from": "carts",
            "localField": "item_id",
            "foreignField": "itemid",
            "as": "inner_data"
        }},
        { $unwind : "$inner_data" },
        {$match:{ 'inner_data.userid' :req.params.id}}
    ]).then((result) => {
        res.send(result)
      })
      .catch((error) => {
        console.log(error);
      });
})

router.post('/',(request,response)=>{
    var temp_data= new Cart({
        userid: request.body.userid,
        itemid: request.body.itemid,
        quantity: request.body.quantity
    })

    temp_data.save((error,results_data)=>{
        if(!error){
            response.send(results_data)
        }else{
            console.log(JSON.stringify(error,undefined,2))
        }
    })
})

router.put('/:id',(request,response)=>{
    if(!ObjectID.isValid(request.params.id)){
        return response.status(400).send(request.params.id)
    }

    var temp_data={
        userid: request.body.userid,
        itemid: request.body.itemid,
        quantity: request.body.quantity
    }

    Cart.findByIdAndUpdate(request.params.id, { $set: temp_data},{new:true}, (error,results_data)=>{
        if(!error){
            response.send(results_data)
        }else{
            console.log(JSON.stringify(error,undefined,2))
        }
    })
})

router.delete('/clear/:id',(req,res)=>{
    if(!ObjectID.isValid(req.params.id)){
        return res.status(400).send(req.params.id)
    }

    Cart.updateMany({ $unset: { userid: req.params.id } },(err,docs)=>{
        if(!err){
            res.send(docs)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.delete('/:id',(request,response)=>{
    if(!ObjectID.isValid(request.params.id)){
        return response.status(400).send(request.params.id)
    }

    Cart.findByIdAndRemove(request.params.id,(error,results_data)=>{
        if(!error){
            response.send(results_data)
        }else{
            response.status(500).send(error)
        }
    })
})

module.exports = router