const mongoose = require('mongoose')

var User = mongoose.model('User',{
    name: {type:String,required:true},
    email: {type:String,required:true},
    address: {type:String,required:true},
    username: {type:String,required:true, unique: true},
    phone: {type:String,required:true},
    password: {type:String,required:true},
    privilege: {type:String,required:true},
    date_completed: {
        type: Date,
        default: Date.now,
    },
})

module.exports = { User }