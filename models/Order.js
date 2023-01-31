const mongoose = require('mongoose')

var Order = mongoose.model('Order',{
    name: {type:String,required:true},
    phone: {type:String,required:true},
    address: {type:String,required:true},
    email: {type:String,required:true},
    total: {type:Number,required:true},
    date_completed: {
        type: Date,
        default: Date.now,
    },
})

module.exports = { Order }