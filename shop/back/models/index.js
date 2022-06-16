const Sequelize = require("sequelize")

/*const sequelize = new Sequelize("shop", "root", "diplom2022", {
        host: "mysqlShop",
        port: 3306,
        multipleStatements: true,
        dialect: 'mysql'
    }
);*/

const sequelize = new Sequelize("shop", "root", "1821anime", {
        host: "localhost",
        port: 3306,
        multipleStatements: true,
        dialect: 'mysql'
    }
);
const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("./userModel")(sequelize, Sequelize);
db.product = require("./productModel")(sequelize, Sequelize);
db.comment = require("./commentModel")(sequelize, Sequelize);
db.wishList = require("./wishListModel")(sequelize, Sequelize);
db.shopRequest = require("./shopRequestModel")(sequelize, Sequelize);
db.basket = require("./basketModel")(sequelize, Sequelize);
db.creditCart = require("./creaditCartModel")(sequelize, Sequelize);
db.order = require("./orderModel")(sequelize, Sequelize);
db.comparison = require("./comparisonModel")(sequelize, Sequelize);

sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
})
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

module.exports = db;