import app from './app.js'
import {PORT} from './config.js'
app.listen(PORT);//3000
console.log('Servidor está ejecutando en el puerto',PORT)
console.log("DB User:", process.env.DB_USER);
console.log("DB Password:", process.env.DB_PASSWORD);
console.log("DB Host:", process.env.DB_HOST);