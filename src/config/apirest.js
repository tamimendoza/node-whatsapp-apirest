const express = require('express')

const { envioController, verificarEstadoEnvioController } = require('../controller/envio.controller')

const apirest = express()
apirest.use(express.json())

apirest.post('/envio', envioController)
apirest.get('/check', verificarEstadoEnvioController)

module.exports = apirest
