const express = require('express');
const app = express();
const bodyparser = require('body-parser');
require('dotenv').config();
require('dotenv-webpack');
const PORT = process.env.PORT || 3001;
const sequelize = require('./services/conection');
const expressJwt = require('express-jwt');
const cors = require('cors');
const expJWT = expressJwt({ secret: process.env.SECRET_TOKEN, algorithms: ['HS512'] });


app.use(express.urlencoded({ extended: true })); //true o false?
app.use(bodyparser.json());
app.use(express.json());


//Importar Rutas
const auth = require('./backend/auth');
const { router, User } = require('./backend/users');
const { region_route, Region } = require('./backend/region');
const { country_route, Country } = require('./backend/country');
const { city_route, City } = require('./backend/city');
const { route_tree, } = require('./backend/jstree');
const { cia_route, Company } = require('./backend/company');
const { contact } = require('./backend/contacts');
const { cont_channels } = require('./backend/contactChannels');
const { channels } = require('./backend/channels');

//Middlewares
const { isAdmin, validateToken, validateLogin, isUser } = require('./services/middleware')
//Rutas
app.use(cors());
app.use('/admin', auth);
app.use('/api', validateToken, isAdmin, router);
app.use('/geo', region_route);
app.use('/country', country_route);
app.use('/cities', city_route);
app.use('/tree', route_tree);
app.use('/company', validateToken, isUser, cia_route);
app.use('/contact', validateToken, isUser, contact);
app.use('/contactandchannels', validateToken, isUser, cont_channels);
app.use('/channels', validateToken, isUser, channels);


//Test
app.get('/', (req, res) => {
    res.json({
        Estado: 'Conectado',
        Mensaje: 'Conectado al servidor'
    })
})
app.listen(PORT, () => {
    console.log(`<  =============  Servidor escuchando en el puerto ${PORT} =====================  >`)
})