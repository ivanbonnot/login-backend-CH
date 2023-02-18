const { Router } = require('express')

const path = require('path');
const User = require('../../class/User')
const userController = require('../../controllers/userMongoDB')

const passport = require('passport');
require('../../config/authPassLocal');

const authWebRouter = Router()

//__LOGIN__//

authWebRouter.get('/login', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        res.redirect('/home')
    } else {
        res.sendFile(path.join(process.cwd(), 'public/views/login.html'))
    }
})


authWebRouter.post('/login', passport.authenticate('login', { failureRedirect: '/login' }), (req, res) => {
    req.session.username = req.user.username;
    const { username, email, password } = req.body;
    res.render(path.join(process.cwd(), 'public/views/home.ejs'), { username });
});


//__REGISTER__//

authWebRouter.get('/register', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        res.redirect('/home')
    } else {
        res.sendFile(path.join(process.cwd(), 'public/views/register.html'))
    }
})


authWebRouter.post('/register', passport.authenticate('register', { failureRedirect: '/login' }), (req, res) => {
    req.session.username = req.user.username;
    const { username, email, password } = req.body;

    const newUser = new User(
        username,
        email,
        password
    )

    userController.saveUser(newUser);
    res.redirect('/login');

});


//__LOGOUT__//

authWebRouter.get('/logout', (req, res) => {
    const nombre = req.session?.nombre
    if (nombre) {
        req.session.destroy(err => {
            if (!err) {
                res.render(path.join(process.cwd(), 'public/views/logout.ejs'), { nombre })
            } else {
                res.redirect('/home')
            }
        })
    } else {
        res.redirect('/login')
    }
})


module.exports = authWebRouter 
