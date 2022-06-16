module.exports = (sequelize, Sequelize) =>{

    const Product = sequelize.define("products",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        name:{
            type: Sequelize.TEXT
        },
        shopName:{
            type: Sequelize.STRING
        },
        shopID:{
            type: Sequelize.STRING
        },
        charecteristics:{
            type: Sequelize.TEXT
        },
        images:{
            type: Sequelize.TEXT
        },
        price:{
            type: Sequelize.INTEGER
        },
        category: {
            type: Sequelize.STRING
        },
        number: {
            type: Sequelize.STRING
        },
        about: {
            type: Sequelize.TEXT
        },
        buyed: {
            type: Sequelize.INTEGER
        }
    });

    return Product
}