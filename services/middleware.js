//constantes
const { header } = require("express/lib/request");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const { Sequelize, DataTypes, Model, QueryTypes, Op } = require('sequelize');
const User = require('../models/users');


/**
 * Validar si envia el TOKEN
 */
const validateToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization; 
    if (!authHeader)
      return res.status(200).send({
        error: true,
        message:
          "Se debe proveer un header 'Authorization' con el formato: 'Bearer <Token>'",
      });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.SECRET_TOKEN);
    console.log('authHeader ',authHeader)  
    if (decoded) {  
      req.userProfile = decoded; //envio el objeto con usuario y profile al otro middleware
      return next();
    }

   return res.status(200).json({ error: true, message: "Token invalido" });
  } catch (err) {
    return res.status(200).send({
      error: true,
      message: 'Token invalido. Debe proveerse con el formato: "Bearer <token>"',
    });
  }
};

/**
 * TODO
 * Validar usuario
 * Validar Admin para rutas protegidas
 */
const isAdmin = (req, res, next) => {
  if (req.userProfile.profile == "A") {
    return next();
    
  } 
  return res.status(201).send({
    message: "Usuario sin autorización"
  })
};

/**
 * Validar el login
 * 
 */
const validateLogin = async (req, res, next) =>{
  //busco por email
  const userLogin = await User.findAll({
    where:{  [Op.or]: [{email : req.body.usuario}, {first_name : req.body.usuario}]
    }
  
  });
    //Valido pass
    const userPass = await bcrypt.compare(req.body.pass, userLogin[0].password);
    if (!userPass) return res.status(400).json({Mensaje: "Email o password incorrecto!!"});
    console.log('userPass ' + userPass);
    req.userLogin = userLogin;
    next();
}
module.exports = {isAdmin, validateToken, validateLogin};
