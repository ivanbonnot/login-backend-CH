const { Router } = require('express')

const path = require('path');

const auth = require('../../middleware/authjson')
const { generateToken } = require('../../config/tokenhandler');

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


authWebRouter.post('/login', (req, res) => {
    const { name, password } = req.body;
  
    const user = users.find(user => user.name === name && user.password === password);
    if (!user) {
      res.json({ error: 'Credenciales inválidas' });
      return;
    }
  
    const token = generateToken(user);
  
    req.session.counter = 0;
    res.cookie('token', token).redirect('/home.html');
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

const users = [];

authWebRouter.post('/register', (req, res) => {

    const { name, email, password } = req.body;
  
    const existentUser = users.find(user => user.name === name);
    if (existentUser) {
      res.json({ error: 'El usuario ya existe' });
      return;
    }
  
    const newUser = { name, email, password };
    users.push(newUser);
  
    const token = generateToken(newUser);
    req.session.counter = 0;
  
    res.cookie('token', token).redirect('/home');
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
