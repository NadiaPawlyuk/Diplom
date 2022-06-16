const express = require('express')
const router = express.Router()
const basket = require("../controllers/basketController")

router.post('/create', basket.create)

router.get('/findAll/:id', basket.findAll)

router.get('/findPr/:id&:pid', basket.findIfInBasket)

router.patch('/disable/:id&:uid', basket.disable)

router.patch('/number/:id&:uid&:number', basket.numberChange)

module.exports = router