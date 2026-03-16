const express = require('express')
const Carts = require('../models/Cart')


const addCarts = async (req,res)=>{

    try{
        
    const{productId,title,image,price,description} = req.body

    const existingcart = await Carts.findOne({productId})

    if(existingcart){

        existingcart.quantity += 1
        
        await existingcart.save()

        return res.status(200).json(existingcart)

    }
    
    const newCart = new Carts({productId,title,image,price,description,quantity:1})

    const saved = await newCart.save()

    res.status(201).json(saved)

    }
    catch(err){
      res.status(500).json({message:err.message})
    }
}

const getCarts = async (req,res)=>{
    try{
        const cartnew = await Carts.find()

        res.status(200).json(cartnew)
    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

const deleteCarts = async(req,res)=>{
    try{
        const delcart = await Carts.findById(req.params.id)

        if(!delcart){
            return res.status(400).json({message:'Product not found'})
        }

        if(delcart.quantity > 1){
            delcart.quantity -= 1

            await delcart.save()

            return res.status(200).json(delcart)
        }

        await Carts.findByIdAndDelete(req.params.id)
        
        return res.status(200).json({message:'Product Delete Sucessfully'})
    }
    catch(err){
        return res.status(500).json({message:err.message})
    }
}

const totalCart = async (req,res)=>{
    try{
        
      const totalcarts = await Carts.find()

      const total = totalcarts.reduce((sum,item)=>
        (sum + item.price * item.quantity,0)
      )

      res.json(total)

    }
    catch(err){
        res.status(500).json({message:err.message})
    }
}

module.exports = {addCarts, getCarts, deleteCarts, totalCart}