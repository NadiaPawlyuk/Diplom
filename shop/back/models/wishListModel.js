module.exports = (sequelize, Sequelize) =>{

    const WishList = sequelize.define("wishList",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        productId:{
            type: Sequelize.STRING
        },
        product:{
            type: Sequelize.TEXT
        },
        userId:{
            type: Sequelize.STRING
        },
        isActive:{
            type: Sequelize.STRING
        }
    });

    return WishList
}