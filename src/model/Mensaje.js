const { Schema, model } = require('mongoose')

const MensajeSchema = new Schema(
  {
    numero: {
      type: String,
      required: true
    },
    mensaje: {
      type: String,
      required: true
    },
    enviado: {
      type: Boolean,
      default: false
    }
  },
  {
    timestamps: true,
    versionKey: false
  }
)

module.exports = model('Mensaje', MensajeSchema)
