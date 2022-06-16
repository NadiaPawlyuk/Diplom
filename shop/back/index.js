const express = require('express')
const bodyParser = require("body-parser")
const cors = require("cors")

const app = express()
const port = 3000

const http = require ('http')
const server = http.createServer(app)

const db = require('./models/index')

db.sequelize.sync({alter: true});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

server.listen(port,  () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

let whitelist = ['http://localhost:3005', 'https://www.liqpay.ua']

let corsOption = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

app.use(cors(corsOption))

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }))

const userRoutes = require('./routes/userRoute')
app.use('/user', userRoutes)

const productRouter = require('./routes/productRoute')
app.use('/product', productRouter)

const commentRouter = require('./routes/commentRoute')
app.use('/comment', commentRouter)

const wishListRouter = require('./routes/wishListRoute')
app.use('/wishList', wishListRouter)

const shopRequestRouter = require('./routes/shopRequestRouter')
app.use('/shopRequest', shopRequestRouter)

const basketRouter = require('./routes/basketRoute')
app.use('/basket', basketRouter)

const creditCartRouter = require('./routes/creditCartRoute')
app.use('/creditCart', creditCartRouter)

const orderRouter = require('./routes/orderRoutes')
app.use('/order', orderRouter)

const comparisonRouter = require('./routes/comparisonRoute')
app.use('/comparison', comparisonRouter)