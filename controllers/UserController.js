const express = require('express')
var router = express.Router()
var ObjectID= require('mongoose').Types.ObjectId
var md5 = require('md5')

var { User } = require('../models/User')

router.get('/',(request,response)=>{
    User.find((err,results_data)=>{
        if(!err){
            response.send(results_data)
        }else{
            response.status(500).send(err)
        }
    })
})

router.get('/:id',(request,response)=>{
    if(!ObjectID.isValid(request.params.id)){
        return response.status(400).send(request.params.id)
    }

    User.findById(request.params.id,(err,results_data)=>{
        if(!err){
            response.send(results_data)
        }else{
            response.status(500).send(err)
        }
    })
})

router.post('/',(request,response)=>{
    var temp_data= new User({
        name: request.body.name,
        email: request.body.email,
        address: request.body.username,
        username: request.body.username,
        phone: request.body.phone,
        password: md5(request.body.password),
        privilege: request.body.privilege,     
    })

    temp_data.save((error,results_data)=>{
        if(!error){
            response.send(results_data)
        }else{
            response.status(500).send(error)
        }
    })
})

router.put('/:id',(request,response)=>{
    if(!ObjectID.isValid(request.params.id)){
        return response.status(400).send(request.params.id)
    }

    var temp_data={
        name: request.body.name,
        email: request.body.email,
        address: request.body.username,
        username: request.body.username,
        phone: request.body.phone,
        password: md5(request.body.password),
        privilege: request.body.privilege,     
    }

    User.findByIdAndUpdate(request.params.id, { $set: temp_data},{new:true}, (err,results_data)=>{
        if(!err){
            response.send(results_data)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.delete('/:id',(request,response)=>{
    if(!ObjectID.isValid(request.params.id)){
        return response.status(400).send(request.params.id)
    }

    User.findByIdAndRemove(request.params.id,(err,results_data)=>{
        if(!err){
            response.send(results_data)
        }else{
            console.log(JSON.stringify(err,undefined,2))
        }
    })
})

router.post('/login', async (request, response) => {
    let username = request.body.username
    let password = request.body.password
    let temp_user_data = await User.findOne({ username: username });
    if (temp_user_data) {
        if(md5(password)==temp_user_data.password)
        {
            if(temp_user_data.privilege=="seller"){
                response.send(JSON.stringify({"data":"seller","id":temp_user_data._id}));
            }else{
                response.send(JSON.stringify({"data":"user","id":temp_user_data._id}));
            }
        }else{
            response.status(500).send(JSON.stringify({"err":"Wrong Password"}));
        }
    } else {
        response.status(500).send(JSON.stringify({"err":"Not found User Data"}));
    }
})

module.exports = router