const express = require('express')
const router = express.Router()
const comment = require("../controllers/commentController")

router.post('/create', comment.create)

router.get('/findAll/:id', comment.findAll)

router.get('/findShop/:id', comment.findAllShop)

module.exports = router