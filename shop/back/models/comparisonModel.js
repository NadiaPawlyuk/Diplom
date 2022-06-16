module.exports = (sequelize, Sequelize) =>{

    const Comparison = sequelize.define("comparison",{
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
        categoryId:{
            type: Sequelize.STRING
        },
        isActive:{
            type: Sequelize.STRING
        }
    });

    return Comparison
}