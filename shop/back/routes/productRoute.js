const express = require('express')
const router = express.Router()
const products = require("../controllers/productController")

router.post('/create', products.create)

router.put('/update/:id', products.update)

router.delete('/delete/:id', products.delete)

router.get('/get/:id', products.getByID)

router.get('/getAll:limit&:offset', products.getAll)

router.get('/search/:condition&:text/&:limit&:offset', products.search)

router.get('/searchHome/:condition/&:text/&:category/&:minPrice/&:maxPrice/&:limit/&:offset', products.searchHome)

router.get('/recommendation/:category', products.getRecommendation)

router.get('/getAllShop/:id&:limit&:offset', products.getAllShop)

router.get('/searchShop/:condition&:text&:id/&:limit&:offset', products.searchShop)

router.get('/interests', products.getInterests)

router.get('/mostBuyed', products.mostBuyed)

module.exports = router