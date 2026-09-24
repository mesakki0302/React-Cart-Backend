
const express = require('express')

const router = express.Router()

const {addCarts, getCarts, deleteCarts, totalCart} = require('../Controller/cartController')

const auth = require('../middleware/authMiddleware')

router.post('/carts', addCarts)

router.get('/takecarts', auth, getCarts)

router.delete('/deletecart/:id',deleteCarts)

router.get('/total', totalCart)

module.exports = router
