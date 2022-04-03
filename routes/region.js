const region_route = require('express').Router();
const bcrypt = require('bcrypt');
const validator = require('validator');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const sequelize = require('../services/conection');
const { Sequelize, DataTypes, Model, QueryTypes, Op } = require('sequelize');
const expressJwt = require('express-jwt');
const req = require('express/lib/request');
const expJWT = expressJwt({ secret: process.env.SECRET_TOKEN, algorithms: ['HS512'] });


// Aqui gestiono todas las rutas de: Region, pais y ciudad
// TODO poner el middleware en las rutas

//Modelo regiones (sequelize)
const Region = sequelize.define("regions", {
    name: {
        type:DataTypes.TEXT,
        allowNull: false,
                validate:{
                    notNull:{msg: "el campo Region no puede ser null"}
                }
        },
        
},
{ timestamps: false,}
)


region_route.post('/region', async (req, res) =>{
    //verificar el token
    //Verifica si la region ya existe
    const verifyRegion = await Region.findAll({
        where: {name: req.body.regionName} 
    })
    if (verifyRegion.length != 0 ) return res.status('403').json({mensaje: `${ req.body.regionName} ya existe` })
    try {
        const region = await Region.create({
            name: req.body.regionName
        })
        res.json({Mensaje: `Region ${req.body.regionName} creado con éxito`});
        
    } catch (error) {
        console.log("el error" + error)
    }
})

region_route.get('/region', async (req, res) =>{
    //verificar el token
    try {
        const queryRegion = await Region.findAll({
            where: {name: req.body.regionName} 
        })
        console.log(queryRegion)
        if (queryRegion.length == 0) return res.status('403').json({mensaje: `${req.body.regionName} no existe`})
        res.status(200).json({q: queryRegion[0].name})
        //console.log(queryRegion[0].dataValues.name)
        //console.log(queryRegion)
    } catch (error) {
        console.log("el error" + error)
    }
})

region_route.put('/region', async (req, res) =>{
    //verificar token
    //Verificar newName para no crear duplicados
    try {
        const verifyRegion = await Region.findAll({
            where: {name: req.body.regionName} 
        })
        if (verifyRegion == 0) return res.status('403').json({mensaje: `${req.body.regionName} no existe`})
        //revisar que req.body.newName no exista
        //si pasa, actualizar
        
        await Region.update({name: req.body.newName}, {
                    where: {name: req.body.regionName}
                })
        const verifyRegion2 = await Region.findAll({
            where: {name: req.body.newName} 
        })
        res.status(200).json({newName: verifyRegion2[0].name})

    } catch (error) {
        console.log("el error" + error)
    }
})

region_route.delete('/region', async (req, res) =>{
    //verificar token
    //
    try {
        const verifyRegion = await Region.findAll({
            where: {name: req.body.regionName} 
        })
        if (verifyRegion == 0) return res.status('403').json({mensaje: `${req.body.regionName} no existe`})

        await Region.destroy({
            where: {name: req.body.regionName} 
        })
        res.status(200).json({newName: `Registro ${req.body.regionName} eliminado`})

    } catch (error) {
        console.log("el error" + error)
    }
})

//Exports
module.exports = {region_route, Region}