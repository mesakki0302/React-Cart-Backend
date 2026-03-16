const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
   productId:{
        type:mongoose.Schema.Types.ObjectId,
        required:true
    },
    title:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    image:{
        type:String
    },
    
    description:{
        type:String,
        required:true
    },

    quantity:{
        type:Number,
        default:1
    }
},{timestamps:true})

module.exports = mongoose.model('cart',cartSchema)