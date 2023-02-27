const { Router } = require('express')
const randomsRouter = Router()
const { fork } = require('child_process');

randomsRouter.get('/:cant', (req, res) => {
    const { cant } = req.params
    const child = fork('./src/helpers/randomNumber.js')

    child.send({ cant: `${cant}` })

    child.on('message', (resultado) => {
        res.send(resultado)
    })
})

randomsRouter.get('/', (req, res) => {

    const child = fork('./src/helpers/randomNumber.js')

    child.send({ cant: `${1000000000}` })

    child.on('message', (resultado) => {
        res.send(resultado)
    })
})

module.exports = randomsRouter