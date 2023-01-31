const mongoose = require('mongoose')

mongoose.connect('mongodb://0.0.0.0:27017/cosmatic',{useNewUrlParser:true,useUnifiedTopology:true},
err => {
    if(!err){
        console.log("connection success!")
    }else{
        console.log("connection fail!" + JSON.stringify(err, undefined , 2))
    }
})