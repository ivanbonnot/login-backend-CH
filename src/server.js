const morgan = require('morgan');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo');

require('dotenv').config()

const { Server: HTTPServer } = require('http');
const { Server: IOServer } = require('socket.io');

const infoRouter = require('./routes/api/info')
const productsRouter = require("./routes/api/product");
const productsRouterTest = require("./routes/api/products-test");
const randomsRouter = require('./routes/api/randoms')
const authWebRouter = require('../src/routes/web/auth.js')
const homeWebRouter = require('../src/routes/web/home')

const connectToDb = require("./config/connectToDb");

const app = express();



const httpServer = new HTTPServer(app);
const io = new IOServer(httpServer);

const productController = require('./controllers/productMongoDB');
const chatsController = require('./controllers/chatMongoDB');


//Settings
app.set('port', process.env.PORT || 8080)
app.set('json spaces', 2)

//Middlewares
app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('./public'))


app.use(session({
    store: MongoStore.create({ mongoUrl: 'mongodb+srv://coderhouse:coderhouse123@cluster0.xvejx.gcp.mongodb.net/test' }),
    secret: '123456',
    resave: true,
    saveUninitialized: true,
    rolling: true,
    cookie: {
        maxAge: 600000 //tiempo de sesion en ms (10min)
    }
}))


const PORT = 8080
const server = httpServer.listen(PORT, () => {
    connectToDb("mongo")
    console.log(`Servidor http escuchando en el puerto ${server.address().port}`)
})
server.on('error', error => console.log(`Error en servidor ${error}`))



//Routes
app.use("/info", infoRouter)
app.use("/api/productos", productsRouter)
app.use("/api/productos-test", productsRouterTest)
app.use("/api/randoms", randomsRouter)

//__ WebServ Routes __//

app.use("/", authWebRouter)
app.use("/", homeWebRouter)


//websocket
io.on('connection', async socket => {
    console.log('Nuevo cliente conectado!');

    // carga inicial de productos
    socket.emit('productos', await productController.getAll());

    // actualizacion de productos
    socket.on('update', async producto => {
        productController.saveProduct(producto)
        io.sockets.emit('productos', await productController.getAll());
    })

    // carga inicial de mensajes
    socket.emit('mensajes', await chatsController.getAll());

    // actualizacion de mensajes
    socket.on('nuevoMensaje', async mensaje => {
        mensaje.date = new Date().toLocaleString()
        await chatsController.saveChat(mensaje)
        io.sockets.emit('mensajes', await chatsController.getAll());
    })
});




