const db = require("../models/index")
const WishList = db.wishList;

exports.create = (req, res) => {

    const user = {
        productId: req.body.productId,
        product: req.body.product,
        userId: req.body.userId,
        isActive: 'true'
    }

    WishList.create(user)
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

    WishList.findAll({where:{
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

exports.findIfInWishList = (req, res) =>{

    const id = req.params.id
    const productId = req.params.pid

    WishList.findAll({where:{
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


    WishList.update({isActive: 'false'}, {
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

    WishList.destroy({
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
