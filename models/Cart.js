const mongoose = require('mongoose')

var Cart = mongoose.model('Cart',{
    userid: {type:String,required:true},
    itemid: {type:String,required:true},
    quantity: {type:Number,required:true},
})
// khdjs
module.exports = { Cart }