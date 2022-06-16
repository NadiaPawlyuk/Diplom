const express = require('express')
const router = express.Router()
const shopRequest = require("../controllers/shopRequestController")

router.post('/create', shopRequest.create)

router.get('/findAll', shopRequest.findAll)

router.patch('/disable/:id', shopRequest.disable)

module.exports = router