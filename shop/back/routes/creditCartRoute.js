const express = require('express')
const router = express.Router()
const creditCart = require("../controllers/creditCartController")

router.post('/create', creditCart.create)

router.get('/findAll/:id', creditCart.findAll)

router.patch('/change/:id&:public&:private', creditCart.change)

module.exports = router