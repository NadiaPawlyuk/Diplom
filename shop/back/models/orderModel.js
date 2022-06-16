module.exports = (sequelize, Sequelize) =>{

    const Order = sequelize.define("orders",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId:{
            type: Sequelize.STRING
        },
        shopID:{
            type: Sequelize.STRING
        },
        address:{
            type: Sequelize.STRING
        },
        firstName:{
            type: Sequelize.STRING
        },
        secondName:{
            type: Sequelize.STRING
        },
        deliveryType:{
            type: Sequelize.STRING
        },
        payType: {
            type: Sequelize.STRING
        },
        toPay: {
            type: Sequelize.STRING
        },
        liqPayId: {
            type: Sequelize.STRING
        },
        post: {
            type: Sequelize.STRING
        },
        phoneNumber: {
            type: Sequelize.STRING
        },
        products: {
            type: Sequelize.TEXT
        },
        deliveryStatus: {
            type: Sequelize.STRING
        },
        payStatus: {
            type: Sequelize.STRING
        },
        status: {
            type: Sequelize.STRING
        }
    });

    return Order
}