
const express = require('express')

const router = express.Router()

const {addCarts, getCarts, deleteCarts, totalCart} = require('../Controller/cartController')

router.post('/carts', addCarts)

router.get('/takecarts', getCarts)

router.delete('/deletecart/:id',deleteCarts)

router.get('/total', totalCart)

module.exports = router
