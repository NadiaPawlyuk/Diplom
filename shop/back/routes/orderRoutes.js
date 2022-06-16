const express = require('express')
const router = express.Router()
const order = require("../controllers/orderController")
const {or} = require("sequelize");

router.post('/create', order.create)

router.get('/findAll', order.findAll)

router.get('/findAllUID/:id', order.findAllUserId)

router.get('/findAllSID/:id', order.findAllShopId)

router.patch('/changeDS/:id/:newStatus', order.changeDeliveryStatus)

router.patch('/changePS/:id/:newStatus', order.changePayStatus)

router.patch('/change/:id/:newStatus', order.changeStatus)

router.get('/checkPay/:id/:publicKey/:privateKey', order.checkPay)

module.exports = router