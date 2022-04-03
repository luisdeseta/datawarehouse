const express = require('express');
const app = express();
const bodyparser = require('body-parser');
require('dotenv').config();
const PORT = process.env.PORT || 3001;
const sequelize = require('./services/conection');
const expressJwt = require('express-jwt');
const cors = require('cors');
const expJWT = expressJwt({ secret: process.env.SECRET_TOKEN, algorithms: ['HS512'] });



app.use(express.urlencoded({ extended: true })); //true o false?
app.use(express.json());

//Importar Rutas
const auth = require('./routes/auth')
const {router, User}= require('./routes/users');
const {region_route, Region}= require('./routes/region');

//Middlewares
const isAdmin = require('./services/middleware')
//Rutas
app.use(cors());
app.use('/admin', auth)
app.use('/api', router); 
app.use('/geo', region_route);

//Test
app.get('/', (req, res) =>{
    res.json({
        Estado: 'Conectado',
        Mensaje: 'Conectado al servidor'
    })
})
app.listen(PORT, ()=>{
    console.log(`<  =============  Servidor escuchando en el puerto ${PORT} =====================  >`)
})