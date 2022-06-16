const db = require("../models/index")
const ShopRequest = db.shopRequest;

exports.create = (req, res) => {

    const user = {
        userId: req.body.userId,
        shopName: req.body.shopName,
        userName: req.body.userName,
        aboutShop: req.body.aboutShop,
        publicKey: req.body.publicKey,
        privateKey: req.body.privateKey,
        isActive: 'true'
    }

    ShopRequest.create(user)
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
    ShopRequest.findAll({
        where:{
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


    ShopRequest.update({isActive: 'false'}, {
        where: {
            id: id
        }
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

    ShopRequest.destroy({
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
