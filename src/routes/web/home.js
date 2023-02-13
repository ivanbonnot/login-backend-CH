const { Router } = require('express')
const webAuth = require('../../auth/index.js')

const path = require('path')

const homeWebRouter = Router()

 homeWebRouter.get('/home', (req, res) => {
     const nombre = req.session?.nombre
    if (nombre) {
        res.sendFile(path.join(process.cwd(), 'public/home.html'))
    } else {
        res.sendFile(path.join(process.cwd(), 'public/views/login.html'))
        res.redirect('/login')
    }
    //  res.sendFile(path.join(process.cwd(), 'public/home.html'))
 })


module.exports = homeWebRouter