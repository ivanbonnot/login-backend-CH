const { Router } = require('express')
const path = require('path')
const homeWebRouter = Router()

homeWebRouter.get('/home', (req, res) => {

    const nombre = req.session?.nombre

    if (nombre) {
        req.session.counter ++;
        res.json({ user: req.user, counter: req.session.counter });
        res.render(path.join(process.cwd(), 'public/views/home.ejs'), { nombre })
    } else {
        res.sendFile(path.join(process.cwd(), 'public/views/login.html'))
        res.redirect('/login')
    }
})


module.exports = homeWebRouter