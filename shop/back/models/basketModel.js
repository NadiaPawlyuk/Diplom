module.exports = (sequelize, Sequelize) =>{

    const Basket = sequelize.define("basket",{
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
        },
        count: {
            type: Sequelize.INTEGER
        }
    });

    return Basket
}