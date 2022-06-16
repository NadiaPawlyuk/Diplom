const db = require("../models/index")
const CreditCart = db.creditCart;

exports.create = (req, res) => {

    const user = {
        publicKey: req.body.publicKey,
        privateKey: req.body.privateKey,
        shopId: req.body.shopId,
    }

    CreditCart.create(user)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            })
        })
}

exports.findAll = (req, res) => {

    const id = req.params.id

    CreditCart.findAll({
        where: {
            shopId: id
        }
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred"
            })
        })
}

exports.change = (req, res) => {
    const id = req.params.id

    const public = req.params.public

    const private = req.params.private

    CreditCart.update({
        publicKey: public,
        privateKey: private
    }, {
        where: {
            shopId: id
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