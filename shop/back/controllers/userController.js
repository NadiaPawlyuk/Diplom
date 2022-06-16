const db = require("../models/index")
const User = db.user;
const Op = db.Sequelize.Op

exports.create = (req, res) => {
    if (!req.body.login || !req.body.password){
        res.status(400).send({
            message: "content cant be empty"
        })
        return
    }

    const user = {
        login: req.body.login,
        password: req.body.password,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        phoneNumber: req.body.phoneNumber,
        isAdmin: req.body.isAdmin ? req.body.isAdmin : false,
        isShop: false,
        shopName: ''
    }

    User.create(user)
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



exports.login = (req, res) =>{

    const login = req.params.login
    const password = req.params.password

    User.findAll({where:{
            login: login,
            password: password
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

exports.search = (req, res) =>{

    const condition = req.params.condition
    const text = req.params.text

    const limit = req.params.limit
    const offset = req.params.offset

    User.findAndCountAll({
        limit: Number(limit),
        offset: Number(offset),
        where:{
            [condition]: {
                [Op.substring]: text
            }
        }})
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while searching data"
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

    User.update(modifiedBody, {
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

    User.destroy({
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

exports.getByID = (req, res) => {
    const id = req.params.id

    User.findAll({where:{
        id: id
    }})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while search user with ID: " + id
        })
    })
}

exports.getAll = (req, res) => {
    const limit = req.params.limit
    const offset = req.params.offset

    console.log(limit)
    console.log(offset)

    User.findAndCountAll({
        limit: Number(limit),
        offset: Number(offset)
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while search user with ID: " + id
        })
    })
}