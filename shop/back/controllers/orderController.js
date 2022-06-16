const db = require("../models/index")
const Op = db.Sequelize.Op
const Order = db.order;

exports.create = (req, res) => {

    const user = {
        userId: req.body.userId,
        shopID: req.body.shopID,
        address: req.body.address,
        firstName: req.body.firstName,
        secondName: req.body.secondName,
        deliveryType: req.body.deliveryType,
        payType: req.body.payType,
        toPay: req.body.toPay,
        liqPayId: req.body.liqPayId,
        post: req.body.post,
        phoneNumber: req.body.phoneNumber,
        products: req.body.products,
        deliveryStatus: 'waiting for the sender in the mail',
        payStatus: 'check',
        status: 'waiting'
    }

    Order.create(user)
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

exports.findAllUserId = (req, res) => {

    const id = req.params.id

    Order.findAll({
        where: {
            userId: id,
        },
        order: [['id', 'DESC']]
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while login: "
            })
        })
}

exports.findAllShopId = (req, res) => {

    const id = req.params.id

    Order.findAll({
        where: {
            shopID: id,
            [Op.or]: [{status: 'waiting'}, {status: 'accept'}]
        }
    })
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

exports.findAll = (req, res) => {

    Order.findAll()
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


exports.changePayStatus = (req, res) => {
    const id = req.params.id
    const newStatus = req.params.newStatus


    Order.update({payStatus: newStatus}, {
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

exports.changeDeliveryStatus = (req, res) => {
    const id = req.params.id
    const newStatus = req.params.newStatus


    Order.update({deliveryStatus: newStatus}, {
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

exports.changeStatus = (req, res) => {
    const id = req.params.id
    const newStatus = req.params.newStatus


    Order.update({status: newStatus}, {
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

exports.checkPay = (req, res) => {
    const pubKey = req.params.publicKey
    const privKey = req.params.privateKey
    const id = req.params.id

    let LiqPay = require('../modified_modules/liqpay-sdk-nodejs/liqpay/lib/liqpay');
    let liqpay = new LiqPay(pubKey, privKey);
    liqpay.api("request", {
        "action": "status",
        "version": "3",
        "order_id": id
    }, function (json) {
        res.send(json.status);
    }, function (err) {
        res.send(err)
    });
}