const { Router } = require('express');
const infoRouter = Router();

infoRouter.get('/', async ( req, res) => {

    const info = {
        cwd: `Directorio actual de trabajo: ${process.cwd()}`,
        pid: 'Id del proceso: '+ process.pid,
        version: 'Version de Node: ' + process.version,
        title: 'Titulo del proceso: ' + process.title,
        platform: 'Sistema operativo: ' + process.platform,
        memory: 'Uso de la memoria: ' + process.memoryUsage()
    }

    res.send(JSON.stringify(info))
})

module.exports = infoRouter