const { Router } = require('express')
const randomsRouter = Router()
const randomController = require('../../controllers/random')
const { fork } = require('child_process');

randomsRouter.get('/:cant',(req, res) => {
    const { cant } = req.params
    res.send(randomController.getNumers(cant))
})

randomsRouter.get('/',(req, res) => {
    res.send(randomController.getNumers(100000000))
})

module.exports = randomsRouter