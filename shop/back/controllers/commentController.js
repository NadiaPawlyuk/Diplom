const db = require("../models/index")
const Comment = db.comment;

exports.create = (req, res) => {

    const user = {
        stars: req.body.stars,
        comment: req.body.comment,
        senderName: req.body.senderName,
        productId: req.body.productId,
        shopId: req.body.shopId
    }

    Comment.create(user)
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

    Comment.findAll({where:{
            productId: id
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

exports.findAllShop = (req, res) =>{

    const id = req.params.id

    Comment.findAll({where:{
            shopId: id
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


exports.update = (req, res) => {
    const id = req.params.id
    let modifiedBody = {}

    for (const [key, value] of Object.entries(req.body)) {
        if (value){
            modifiedBody[key]=value
        }
    }

    Comment.update(modifiedBody, {
        where: {id: id}
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

    Comment.destroy({
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
