const { Client, LocalAuth } = require('whatsapp-web.js')
const qrcode = require('qrcode-terminal')
const { enviarMensajeRecibido } = require('../webhook')

let clienteWSP = null

const inicializarWSP = async () => {
  clienteWSP = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
      headless: true,
      args: [
        '--no-sandbox',
        '--disable-setuid-sandbox'
      ]
    }
  })

  clienteWSP.on('qr', (qr) => {
    qrcode.generate(qr, { small: true })
  })

  clienteWSP.on('authenticated', () => {
    console.log('Autenticado!')
  })

  clienteWSP.on('auth_failure', (msg) => {
    console.error('Error de autenticación', msg)
  })

  clienteWSP.on('loading_screen', (porcentaje, mensaje) => {
    console.log(`Cargando: ${porcentaje} - ${mensaje}`)
  })

  clienteWSP.on('ready', () => {
    console.log('Client is ready!')
  })

  /* clienteWSP.on('message', message => {
    if (message.body === '!ping') {
      message.reply('pong')
    }
  }) */

  clienteWSP.on('message', message => {
    enviarMensajeRecibido(message.from, message.body)
  })

  await clienteWSP.initialize()
}

const enviarMensajeWSP = async (numero, mensaje) => {
  try {
    numero = numero + '@c.us'
    const respuesta = await clienteWSP.sendMessage(numero, mensaje)
    return respuesta
  } catch (error) {
    const mensajeError = `Error al enviar mensaje a ${numero}`
    console.error(mensajeError, error)
    throw new Error(mensajeError)
  }
}

module.exports = {
  inicializarWSP,
  enviarMensajeWSP
}
