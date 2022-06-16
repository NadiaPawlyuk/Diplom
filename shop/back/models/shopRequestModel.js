module.exports = (sequelize, Sequelize) => {

    const ShopRequest = sequelize.define("shopRequest", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        userId: {
            type: Sequelize.STRING
        },
        shopName: {
            type: Sequelize.STRING
        },
        userName: {
            type: Sequelize.STRING
        },
        aboutShop: {
            type: Sequelize.TEXT
        },
        publicKey:{
            type: Sequelize.STRING
        },
        privateKey:{
            type: Sequelize.STRING
        },
        isActive: {
            type: Sequelize.STRING
        }
    });

    return ShopRequest
}