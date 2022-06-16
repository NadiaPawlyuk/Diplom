const db = require("../models/index")
const {Sequelize} = require("sequelize");
const Product = db.product;
const Op = db.Sequelize.Op

exports.create = (req, res) => {
    if (!req.body.name || !req.body.price){
        res.status(400).send({
            message: "content cant be empty"
        })
        return
    }

    const product = {
        name: req.body.name,
        shopName: req.body.shopName,
        shopID: req.body.shopID,
        charecteristics: req.body.charecteristics,
        images: req.body.images,
        price: Number(req.body.price),
        category: req.body.category,
        number: req.body.number,
        about: req.body.about,
        buyed: 0
    }

    Product.create(product)
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Product"
            })
        })
}

exports.update = (req, res) => {
    const id = req.params.id
    let modifiedBody = {}

    for (const [key, value] of Object.entries(req.body)) {
        if(key === 'price'){
            modifiedBody[key]=Number(value)
        } else if (value){
            modifiedBody[key]=value
        }
    }

    Product.update(modifiedBody, {
        where: {id: id}
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while updating the Product with ID: " + id
            })
        })
}

exports.delete = (req, res) => {
    const id = req.params.id

    Product.destroy({
        where: {id: id}
    })
        .then(num => {
            (num === 1) ? res.send('Success') : res.send('Invalid data')
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting the Product with ID: " + id
            })
        })
}

exports.getRecommendation = (req, res) => {
    const category = req.params.category

    Product.findAll({
        where: {category: category},
        order: Sequelize.literal('rand()'),
        limit: 5
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting the Product with ID: " + id
            })
        })
}

exports.getByID = (req, res) => {
    const id = req.params.id

    Product.findAll({where:{
        id: id
    }})
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while search products with ID: " + id
        })
    })
}

exports.getAll = (req, res) => {
    const limit = req.params.limit
    const offset = req.params.offset

    console.log(limit)
    console.log(offset)

    Product.findAndCountAll({
        limit: Number(limit),
        offset: Number(offset)
    })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while search product with ID: " + id
            })
        })
}

exports.getAllShop = (req, res) => {
    const limit = req.params.limit
    const offset = req.params.offset
    const id = req.params.id

    console.log(limit)
    console.log(offset)

    Product.findAndCountAll({
        limit: Number(limit),
        offset: Number(offset),
        where: {
            shopID: id
        }
    })
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        res.status(500).send({
            message:
                err.message || "Some error occurred while search product with ID: " + id
        })
    })
}

exports.search = (req, res) =>{

    const condition = req.params.condition
    const text = req.params.text

    const limit = req.params.limit
    const offset = req.params.offset

    Product.findAndCountAll({
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

exports.searchShop = (req, res) =>{

    const condition = req.params.condition
    const text = req.params.text
    const id = req.params.id

    const limit = req.params.limit
    const offset = req.params.offset

    Product.findAndCountAll({
        limit: Number(limit),
        offset: Number(offset),
        where:{
            [condition]: {
                [Op.substring]: text
            },
            shopID: id
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

exports.searchHome = (req, res) =>{

    const condition = req.params.condition
    const text = req.params.text

    const cat = req.params.category.split(',')

    let arr = []

    cat.forEach(data => {
        if (data === 'Henna'){
            arr.push({category: 'Henna, basma for hair'})
        } else if (data === 'Women deodorants'){
            arr.push({category: 'Women deodorants, antiperspirants'})
        } else if (data === 'Men\'s deodorants'){
            arr.push({category: 'Men\'s deodorants, antiperspirants'})
        } else if (data === 'Creams'){
            arr.push({category: 'Creams, lotions for the body'})
        }
        arr.push({category: data})
    })

    arr.push({category: 'NoCategory'})

    console.log('ARR', arr)
    console.log('CAT', cat)

    const minPrice = req.params.minPrice
    const maxPrice = req.params.maxPrice

    const limit = req.params.limit
    const offset = req.params.offset

    if(minPrice === '0' && maxPrice === '99999') {
        if (cat[0] !== 'no' && text !== 'asdasdasdasdasdasdasdasdasdasdasd') {
            Product.findAndCountAll({
                limit: Number(limit),
                offset: Number(offset),
                where: {
                    [Op.or]: arr,
                    [condition]: {
                        [Op.substring]: text
                    }
                }
            })
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while searching data"
                    })
                })
        } else if (cat[0] !== 'no') {
            Product.findAndCountAll({
                limit: Number(limit),
                offset: Number(offset),
                where: {
                    [Op.or]: arr
                }
            })
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while searching data"
                    })
                })
        } else if (text !== 'asdasdasdasdasdasdasdasdasdasdasd') {
            Product.findAndCountAll({
                limit: Number(limit),
                offset: Number(offset),
                where: {
                    [condition]: {
                        [Op.substring]: text
                    }
                }
            })
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
    }
    if(Number(minPrice) > 0 || Number(maxPrice) < 99999) {
        if (cat[0] !== 'no' && text !== 'asdasdasdasdasdasdasdasdasdasdasd') {
            Product.findAndCountAll({
                limit: Number(limit),
                offset: Number(offset),
                where: {
                    [Op.or]: arr,
                    [condition]: {
                        [Op.substring]: text
                    },
                    price:{
                        [Op.and]: [
                            {[Op.gt]: Number(minPrice)},
                            {[Op.lt]: Number(maxPrice)}
                        ]
                    }
                }
            })
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while searching data"
                    })
                })
        } else if (cat[0] !== 'no') {
            Product.findAndCountAll({
                limit: Number(limit),
                offset: Number(offset),
                where: {
                    [Op.or]: arr,
                    price:{
                        [Op.and]: [
                            {[Op.gt]: Number(minPrice)},
                            {[Op.lt]: Number(maxPrice)}
                        ]
                    }
                }
            })
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while searching data"
                    })
                })
        } else if (text !== 'asdasdasdasdasdasdasdasdasdasdasd') {
            Product.findAndCountAll({
                limit: Number(limit),
                offset: Number(offset),
                where: {
                    [condition]: {
                        [Op.substring]: text
                    },
                    price:{
                        [Op.and]: [
                            {[Op.gt]: Number(minPrice)},
                            {[Op.lt]: Number(maxPrice)}
                        ]
                    }
                }
            })
                .then(data => {
                    res.send(data)
                })
                .catch(err => {
                    res.status(500).send({
                        message:
                            err.message || "Some error occurred while searching data"
                    })
                })
        } else{
            Product.findAndCountAll({
                limit: Number(limit),
                offset: Number(offset),
                where: {
                    price:{
                        [Op.and]: [
                            {[Op.gt]: Number(minPrice)},
                            {[Op.lt]: Number(maxPrice)}
                        ]
                    }
                }
            })
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
    }

}

exports.getInterests = (req, res) => {

    Product.findAll({
        order: Sequelize.literal('rand()'),
        limit: 4
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting the Product with ID: " + id
            })
        })
}

exports.mostBuyed = (req, res) => {

    Product.findAll({
        order: [['buyed', 'DESC']],
        limit: 10
    })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while deleting the Product with ID: "
            })
        })
}