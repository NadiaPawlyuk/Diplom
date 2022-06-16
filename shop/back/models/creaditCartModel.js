module.exports = (sequelize, Sequelize) =>{

    const CreditCart = sequelize.define("creditCart",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        publicKey:{
            type: Sequelize.STRING
        },
        privateKey:{
            type: Sequelize.STRING
        },
        shopId:{
            type: Sequelize.STRING
        }
    });

    return CreditCart
}