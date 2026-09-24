const express = require('express')
const router = express.Router()
const contactlist = require('../Controller/contactController')

router.post('/contact',contactlist)

module.exports = router