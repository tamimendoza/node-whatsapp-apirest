const { enviarMensajeWSP } = require('../config/wsp/inicializarWSP')
const { guardarNuevoMensajeService, actualizarEstadoEnviadoService, existeErrorEnvioService } = require('../services/envio.service')

const envioController = async (req, res) => {
  const { numero, mensaje } = req.body

  try {
    const mensajeDB = await guardarNuevoMensajeService(numero, mensaje)
    const respuesta = await enviarMensajeWSP(numero, mensaje)

    if (respuesta) {
      await actualizarEstadoEnviadoService(mensajeDB._id, true)
      res.send({ mensaje: 'Mensaje enviado' })
    } else {
      res.send({ mensaje: 'Mensaje no enviado' })
    }
  } catch (error) {
    const errorController = `Error al enviar mensaje a ${numero}`
    console.error(errorController, error)
    res.status(500).send({ mensaje: errorController })
  }
}

const verificarEstadoEnvioController = async (req, res) => {
  try {
    const errorEnvio = await existeErrorEnvioService(false)
    if (errorEnvio) {
      res.status(500).send({ mensaje: 'ERROR' })
    } else {
      res.send({ mensaje: 'OK' })
    }
  } catch (error) {
    const errorController = 'Error al verificar el estado de envío'
    console.error(errorController, error)
    res.status(500).send({ mensaje: errorController })
  }
}

module.exports = {
  envioController,
  verificarEstadoEnvioController
}
