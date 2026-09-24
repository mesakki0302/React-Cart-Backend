const Contact = require('../models/Contact')

const contactpost = async(req,res)=>{

try{
    const{name,email,subject,message} = req.body

    const existingcontact = await Contact.findOne({email})

    if(existingcontact){
        return res.status(400).json('User already in the contact list')
    }

    const newContact = new Contact({name,email,subject,message})

    await newContact.save()

    res.status(201).json({message:'New Contact send sucessfully'})
    
}

catch(error){
        
    res.status(500).json({message:error.message})
    
}

    
}

module.exports = contactpost