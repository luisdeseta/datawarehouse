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
const auth = require('./routes/auth');
const { router, User } = require('./routes/users');
const { region_route, Region } = require('./routes/region');
const { country_route, Country } = require('./routes/country');
const { city_route, City } = require('./routes/city');
const { route_tree } = require('./routes/jstree');
const { cia_route, Company } = require('./routes/company');
const { contact } = require('./routes/contacts');
const { cont_channels } = require('./routes/contactChannels');
const { channels } = require('./routes/channels');

//Middlewares
const { isAdmin, validateToken, validateLogin, isUser } = require('./services/middleware')
//Rutas
app.use(cors());
app.use('/admin', auth);
app.use('/api', validateToken, isAdmin, router);
app.use('/geo', validateToken, isUser, region_route);
app.use('/country', validateToken, isUser, country_route);
app.use('/cities', validateToken, isUser, city_route);
app.use('/tree', route_tree);
app.use('/company', validateToken, isUser, cia_route);
app.use('/contact', contact);
app.use('/contactandchannels', cont_channels);
app.use('/channels', channels);


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