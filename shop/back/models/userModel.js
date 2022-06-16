module.exports = (sequelize, Sequelize) =>{

    const User = sequelize.define("users",{
        id:{
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        firstName:{
            type: Sequelize.STRING
        },
        secondName:{
            type: Sequelize.STRING
        },
        phoneNumber:{
            type: Sequelize.STRING
        },
        login:{
            type: Sequelize.STRING,
            unique: true
        },
        password:{
            type: Sequelize.STRING
        },
        isAdmin:{
            type: Sequelize.BOOLEAN
        },
        isShop:{
            type: Sequelize.BOOLEAN
        },
        shopName:{
            type: Sequelize.STRING
        }
    });

    return User
}