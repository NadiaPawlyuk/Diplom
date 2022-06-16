module.exports = (sequelize, Sequelize) =>{

    const Comment = sequelize.define("comments",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        stars:{
            type: Sequelize.STRING
        },
        comment:{
            type: Sequelize.TEXT
        },
        senderName:{
            type: Sequelize.STRING
        },
        productId:{
            type: Sequelize.STRING
        },
        shopId:{
            type: Sequelize.STRING
        }
    });

    return Comment
}