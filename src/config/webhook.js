const enviarMensajeRecibido = async (numero, mensaje) => {
  try {
    const URL = 'http://localhost:8080/webhook'

    const opciones = {
      method: 'POST',
      body: JSON.stringify({ numero, mensaje }),
      headers: {
        'Content-Type': 'application/json'
      }
    }

    const respuesta = await fetch(URL, opciones)

    if (respuesta.statusText !== 'OK') {
      throw new Error('Error en la respuesta de la API WebHook')
    }

    await respuesta.json()
    console.log('Respuesta existosa de la API WebHook')
  } catch (error) {
    const mensajeError = `Error al enviar mensaje a ${numero}`
    console.error(mensajeError, error)
    throw new Error(mensajeError)
  }
}

module.exports = {
  enviarMensajeRecibido
}
