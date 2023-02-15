const { Router } = require('express')

const path = require('path');

const authWebRouter = Router()


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
                res.render(path.join(process.cwd(), 'public/views/logout.ejs'), { nombre })
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
    nombreSession = req.session.nombre
    res.redirect('/home')
})


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
  
    res.cookie('token', token).redirect('/datos.html');
  });


module.exports = authWebRouter 
