const { default: mongoose } = require('mongoose')

const iniciarDB = async () => {
  try {
    await mongoose.connect('mongodb://mongoddwsp:27017/whatsapp')
    console.log('Conexión a MongoDB exitosa')
  } catch (error) {
    const mensajeError = 'Error al conectar a MongoDB'
    console.error(mensajeError, error)
    throw new Error(mensajeError)
  }
}

const cerrarDB = async () => {
  try {
    await mongoose.connection.close()
    console.log('Desconexión de MongoDB exitosa')
  } catch (error) {
    const mensajeError = 'Error al desconectar de MongoDB'
    console.error(mensajeError, error)
    throw new Error(mensajeError)
  }
}

module.exports = {
  iniciarDB,
  cerrarDB
}
