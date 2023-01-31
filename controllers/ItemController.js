const express = require('express')
var multer = require('multer')
var uniqid = require('uniqid')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId

var { Item } = require('../models/Item')

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, 'public')
  },
  filename: function (req, file, cb) {
    cb(null, uniqid() + '-' +file.originalname )
  }
})

var upload = multer({ storage: storage }).single('file')

router.post('/upload',function(req, res) {
     
    upload(req, res, function (error) {
           if (error instanceof multer.MulterError) {
               return res.status(500).json(error)
           } else if (error) {
               return res.status(500).json(error)
           }
      return res.status(200).send(req.file)

    })

})

router.get('/',(request,response)=>{
    Item.find((error,results_data)=>{
        if(!error){
            response.send(results_data)
        }else{
            console.log(JSON.stringify(error,undefined,2))
        }
    })
})

router.get('/:id',(request,response)=>{
    if(!ObjectID.isValid(request.params.id)){
        return response.status(400).send(request.params.id)
    }

    Item.findById(request.params.id,(error,results_data)=>{
        if(!error){
            response.send(results_data)
        }else{
            console.log(JSON.stringify(error,undefined,2))
        }
    })
})

router.post('/',(request,response)=>{
    var temp_data= new Item({
        name: request.body.name,
        image: request.body.image_url,
        price: request.body.price,
        description: request.body.description,
        availability: request.body.availability    
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
        image: request.body.image_url,
        price: request.body.price,
        description: request.body.description,
        availability: request.body.availability
    }

    Item.findByIdAndUpdate(request.params.id, { $set: temp_data},{new:true}, (error,results_data)=>{
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

    Item.findByIdAndRemove(request.params.id,(error,results_data)=>{
        if(!error){
            response.send(results_data)
        }else{
            response.status(500).send(error)
        }
    })
})

module.exports = router