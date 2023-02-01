const mongoose = require('mongoose')

var Item = mongoose.model('Item',{
    name: {type:String,required:true},
    image: {type:String,required:true},
    price: {type:Number,required:true},
    description: {type:String,required:true},
    availability: {type:Number,required:true},
    date_completed: {
        type: Date,
        default: Date.now,
    },
})
//ljfg
module.exports = { Item }