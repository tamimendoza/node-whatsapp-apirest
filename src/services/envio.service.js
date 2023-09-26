const Mensaje = require('../model/Mensaje')

const guardarNuevoMensajeService = async (numero, mensaje) => {
  try {
    const nuevoMsg = new Mensaje({ numero, mensaje })
    return await nuevoMsg.save()
  } catch (error) {
    const errorService = 'Error al guardar el nuevo mensaje'
    console.error(errorService, error)
    throw new Error(errorService)
  }
}

const actualizarEstadoEnviadoService = async (id, enviado) => {
  try {
    await Mensaje.updateOne({ _id: id }, { enviado })
  } catch (error) {
    const errorService = 'Error al actualizar el estado del mensaje'
    console.error(errorService, error)
    throw new Error(errorService)
  }
}

const existeErrorEnvioService = async (enviado) => {
  try {
    const count = await Mensaje.countDocuments({})
    if (count === 0) return false
    const mensajes = await Mensaje.find({ enviado })
    return (mensajes.length > 0)
  } catch (error) {
    const errorService = 'Error al verificar si existen mensajes con error de envío'
    console.error(errorService, error)
    throw new Error(errorService)
  }
}

module.exports = {
  guardarNuevoMensajeService,
  actualizarEstadoEnviadoService,
  existeErrorEnvioService
}
