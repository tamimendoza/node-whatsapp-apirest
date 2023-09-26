const { inicializarWSP } = require('./src/config/wsp/inicializarWSP')
const apirest = require('./src/config/apirest')

const { iniciarDB } = require('./src/config/db/conexionMongoDB');
(async () => {
  try {
    await inicializarWSP()
    await iniciarDB()
    apirest.listen(3000, () => {
      console.log('Servidor escuchando en puerto 3000')
    })
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
})()
