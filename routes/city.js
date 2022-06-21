const city_route = require('express').Router();
const bcrypt = require('bcrypt');
const validator = require('validator');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const sequelize = require('../services/conection');
const { Sequelize, DataTypes, Model, QueryTypes, Op } = require('sequelize');
const expressJwt = require('express-jwt');
const req = require('express/lib/request');

// CRUD de paises
const City = sequelize.define("cities", {
    country_id:{
        type:DataTypes.TEXT,
        allowNull: false,
                validate:{
                    notNull:{msg: "el campo country no puede ser null"}
                }
    },
    name: {
        type:DataTypes.TEXT,
        allowNull: false,
                validate:{
                    notNull:{msg: "el campo city no puede ser null"}
                }
        },
        
},
{ timestamps: false,}
)

city_route.post('/city', async (req, res) =>{
    //Verifica si el pais ya existe
    const verifyCity = await City.findAll({
        where: {name: req.body.cityName} 
    })
    if (verifyCity.length != 0 ) return res.status('403').json({mensaje: `${ req.body.cityName} ya existe` })
    try {
        const newCity = await City.create({
            country_id: req.body.countryID,
            name: req.body.cityName
        })
        res.json({Mensaje: `City ${req.body.cityName} creado con éxito`});
        
    } catch (error) {
        res.json({Error: error})
        console.log("el error ", error)
    }
})

city_route.get('/city/:city', async (req, res) =>{
    //verificar el token
    try {
        const {city} = req.params;
        const queryCity = await City.findAll({
            where: {name: {[Op.like]: `%${city}%`}} 
        })
        console.log(queryCity)
        if (queryCity.length == 0) return res.status('403').json({mensaje: `${City} no existe`})
        res.status(200).json({city: queryCity[0].name,
        ID:queryCity[0].id})
        
        
    } catch (error) {
        res.json({Error: error})
        console.log("el error ", error)
    }
})

city_route.put('/city', async (req, res) =>{
    //verificar token
    //Verificar newName para no crear duplicados
    try {
        const verifyCity = await City.findAll({
            where: {name: req.body.cityName} 
        })
        if (verifyCity == 0) return res.status('403').json({mensaje: `${req.body.cityName} no existe`})
        //revisar que req.body.newName no exista
        //si pasa, actualizar
        
        await City.update({name: req.body.newName}, {
                    where: {name: req.body.cityName}
                })
        const verifyCity2 = await City.findAll({
            where: {name: req.body.newName} 
        })
        res.status(200).json({newName: verifyCity2[0].name})

    } catch (error) {
        res.json({Error: error})
        console.log("el error ",  error)
    }
})

city_route.delete('/city', async (req, res) =>{
    //verificar token
    //
    try {
        const verifyCity = await City.findAll({
            where: {name: req.body.cityName} 
        })
        if (verifyCity == 0) return res.status('403').json({mensaje: `${req.body.cityName} no existe`})

        await City.destroy({
            where: {name: req.body.cityName} 
        })
        res.status(200).json({newName: `Registro ${req.body.cityName} eliminado`})

    } catch (error) {
        res.json({Error: error})
        console.log("el error ", error)
    }
})

//Exports
module.exports = {city_route, City}