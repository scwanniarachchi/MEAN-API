const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId

var { Order } = require('../models/Order')

router.get('/',(request,response)=>{
    Order.find((error,results_data)=>{
        if(!error){
            response.send(results_data)
        }else{
            console.log(JSON.stringify(error,undefined,2))
        }
    })
})

router.post('/',(request,response)=>{
    var temp_data= new Order({
        name: request.body.name,
        phone: request.body.phone,
        address: request.body.address,
        email: request.body.email,
        total: request.body.total,
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
        name: request.body.name,
        phone: request.body.phone,
        address: request.body.address,
        email: request.body.email,
        total: request.body.total,
    }

    Order.findByIdAndUpdate(request.params.id, { $set: temp_data},{new:true}, (error,results_data)=>{
        if(!error){
            response.send(results_data)
        }else{
            console.log(JSON.stringify(error,undefined,2))
        }
    })
})

router.delete('/:id',(request,response)=>{
    if(!ObjectID.isValid(request.params.id)){
        return response.status(400).send(request.params.id)
    }

    Order.findByIdAndRemove(request.params.id,(error,results_data)=>{
        if(!error){
            response.send(results_data)
        }else{
            response.status(500).send(error)
        }
    })
})

module.exports = router