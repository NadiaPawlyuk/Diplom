const express = require('express')
const router = express.Router()
const wishList = require("../controllers/wishListControlle")

router.post('/create', wishList.create)

router.get('/findAll/:id', wishList.findAll)

router.get('/findPr/:id&:pid', wishList.findIfInWishList)

router.patch('/disable/:id&:uid', wishList.disable)

module.exports = router