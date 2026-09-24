const mongoose = require('mongoose')

const contactSchema = new mongoose.Schema({
    name:{
        type:String,
        trim:true,
        required:true
    },
    email:{
        type:String,
        lowercase:true,
        required:true,
        trim:true
    },
    subject:{
        type:String,
        trim:true
    },
    message:{
        type:String,
        trim:true
    }
})

const contact = mongoose.model('contact',contactSchema)

module.exports = contact