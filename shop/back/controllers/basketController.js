const db = require("../models/index")
const Basket = db.basket;

exports.create = (req, res) => {

    const user = {
        productId: req.body.productId,
        product: req.body.product,
        userId: req.body.userId,
        isActive: 'true',
        count: 1
    }

    Basket.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Person"
            })
        })
}

exports.findAll = (req, res) =>{

    const id = req.params.id

    Basket.findAll({where:{
            userId: id,
            isActive: 'true'
        }})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while login: " + login
            })
        })
}

exports.findIfInBasket = (req, res) =>{

    const id = req.params.id
    const productId = req.params.pid

    Basket.findAll({where:{
            userId: id,
            productId: productId,
            isActive: 'true'
        }})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while login: " + login
            })
        })
}


exports.disable = (req, res) => {
    const id = req.params.id
    const uid = req.params.uid


    Basket.update({isActive: 'false'}, {
        where: {productId: id,
            isActive: 'true',
            userId: uid}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating the Persons with ID: " + id
            })
        })
}

exports.numberChange = (req, res) => {
    const id = req.params.id
    const uid = req.params.uid
    const number = req.params.number

    Basket.update({count: Number(number)}, {
        where: {productId: id,
            isActive: 'true',
            userId: uid}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating the Persons with ID: " + id
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Basket.destroy({
        where: {id: id}
    })
        .then(num => {
            (num === 1) ? res.send('Success') : res.send('Invalid data')
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting the Persons with ID: " + id
            })
        })
}
