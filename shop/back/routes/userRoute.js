const express = require('express')
const router = express.Router()
const users = require("../controllers/userController")

router.post('/create', users.create)

router.put('/update/:id', users.update)

router.delete('/delete/:id', users.delete)

router.get('/login:login&:password', users.login)

router.get('/get/:id', users.getByID)

router.get('/getAll:limit&:offset', users.getAll)

router.get('/search/:condition&:text/&:limit&:offset', users.search)

module.exports = router