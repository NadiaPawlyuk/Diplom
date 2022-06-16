const express = require('express')
const router = express.Router()
const comparison = require("../controllers/comparisonControlle")

router.post('/create', comparison.create)

router.get('/findAll/:id', comparison.findAll)

router.get('/findPr/:id&:pid', comparison.findIfInComparison)

router.patch('/disable/:id&:uid', comparison.disable)

module.exports = router