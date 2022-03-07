const express = require('express');
const app = express();
const bodyparser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const sequelize = require('./services/conection');
const expressJwt = require('express-jwt');
const cors = require('cors');

app.use(express.urlencoded({ extended: true })); //true o false?
app.use(express.json());

//Importar Rutas
const {router, User}= require('./routes/users');

//Middlewares

//Rutas
app.use(cors());
app.use('/api', router); 

//Test
app.get('/', (req, res) =>{
    res.json({
        Estado: 'Conectado',
        Mensaje: 'Conectado al servidor'
    })
})
app.listen(PORT, ()=>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})