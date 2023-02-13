const { Router } = require('express')  

const path = require('path') 

const authWebRouter = Router()

// authWebRouter.get('/', (req, res) => {
//     res.redirect('/home')
// })

authWebRouter.get('/login', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        res.redirect('/home')
    } else {
        res.sendFile(path.join(process.cwd(), 'public/views/login.html'))
    }
})


authWebRouter.get('/logout', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), 'public/views/logout.html'), { nombre })
            } else {
                res.redirect('/home')
            }
        })
    } else {
        res.redirect('/login')
    }
})


authWebRouter.post('/login', (req, res) => {
    req.session.nombre = req.body.nombre
    res.redirect('/home')
})



module.exports = authWebRouter