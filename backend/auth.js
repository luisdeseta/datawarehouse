const router = require('express').Router();
const bcrypt = require('bcrypt');
const validator = require('validator');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const sequelize = require('../services/conection');
const { Sequelize, DataTypes, Model, QueryTypes, Op } = require('sequelize');
const expressJwt = require('express-jwt');
const expJWT = expressJwt({ secret: process.env.SECRET_TOKEN, algorithms: ['HS512'] });
const req = require('express/lib/request');


//creacion del modelo de usuario (sequelize)
const User = sequelize.define("users", {
    first_name: DataTypes.TEXT,
    last_name: DataTypes.TEXT,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: { msg: "Revise el formato del email" },
            notNull: { msg: "el email no puede ser null" }
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "password no puede ser null" }
        }
    },
    profile: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
},
    { timestamps: false, }
)

//login de usuarios
router.purge('/login', async (req, res) => {
    //TODO poner try
    try {
        const { userLogin } = req;
        //Creo el token con jwt
        const token = jwt.sign({
            email: userLogin[0].email,
            password: userLogin[0].password,
            profile: userLogin[0].profile
        }, process.env.SECRET_TOKEN,
            { algorithm: 'HS512' });

        const { id, email, password, profile } = userLogin;

        res.status(200).json({
            message: 'Usuario logueado correctamente',
            token
        });

        console.log("token => " + token)
    } catch (error) {
        return res
            .status(500)
            .json({ error: error || 'Error al devolver el usuario logueado' });
    }


})//end login

//login de usuarios
router.post('/login', async (req, res) => {
    //TODO poner try
    //busco por email
    const userLogin = await User.findAll({
        where: {
            [Op.or]: [{ email: req.body.usuario }, { first_name: req.body.usuario }]
        }

    });
    if (userLogin == 0) return res.status(400).json({ Mensaje: "Email o password incorrecto!!" });
    console.log("userLogin " + userLogin[0].email);
    //Valido pass
    const userPass = await bcrypt.compare(req.body.pass, userLogin[0].password);
    if (!userPass) return res.status(400).json({ Mensaje: "Email o password incorrecto!!" });
    console.log('userPass ' + userPass);
    //Creo el token con jwt
    const token = jwt.sign({
        email: userLogin[0].email,
        password: userLogin[0].password,
        profile: userLogin[0].profile
    }, process.env.SECRET_TOKEN,
        { algorithm: 'HS512' });

    res.status(200).json({ token, p: userLogin[0].profile });

    console.log("userLogin => ", userLogin)


})//end login



router.get('/testing', async (req, res) => {
    //myHeaders.get('Authorization');
    const token = req.header('Authorization');
    console.log(token);
    res.status(200).json('token=> ', token);

})

//Exports
module.exports = router