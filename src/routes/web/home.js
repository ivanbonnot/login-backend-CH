const Router = require('express')
const webAuth = require('../../auth/index.js')

const path = require('path')

const homeWebRouter = new Router()

homeWebRouter.get('/home', webAuth, (req, res) => {
    // res.sendFile(path.join(process.cwd(), '/views/home.html'))
    res.render(path.join(process.cwd(), '/views/pages/home.ejs'), { nombre: req.session.nombre })
})

homeWebRouter.get('/productos-vista-test', (req, res) => {
    res.sendFile(path.join(process.cwd(), '/views/productos-vista-test.html'))
})

module.exports = homeWebRouter