const country_route = require('express').Router();
const bcrypt = require('bcrypt');
const validator = require('validator');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const sequelize = require('../services/conection');
const { Sequelize, DataTypes, Model, QueryTypes, Op } = require('sequelize');
const req = require('express/lib/request');
const expressJwt = require('express-jwt');

// CRUD de paises
const Country = sequelize.define("countries", {
    regions_id: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "el campo id de region no puede ser null" }
        }
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "el campo País no puede ser null" }
        }
    },

},
    { timestamps: false, }
)

country_route.post('/country', async (req, res) => {
    //Verifica si el pais ya existe
    const verifyCountry = await Country.findAll({
        where: { name: req.body.name }
    })
    if (verifyCountry.length != 0) return res.status('403').json({ mensaje: `${req.body.name} ya existe` })
    try {
        const country = await Country.create({
            regions_id: req.body.parent,
            name: req.body.name
        })
        res.json({ Mensaje: `Pais ${req.body.name} creado con éxito` });

    } catch (error) {
        res.json({ Error: error })
        console.log("el error ", error)
    }
})

country_route.get('/country/:country', async (req, res) => {
    //verificar el token
    try {
        const { country } = req.params;
        const queryCountry = await Country.findAll({
            where: { name: { [Op.like]: `%${country}%` } }
        })
        console.log(queryCountry)
        if (queryCountry.length == 0) return res.status('403').json({ mensaje: `${country} no existe` })
        res.status(200).json({
            country: queryCountry[0].name,
            ID: queryCountry[0].id
        })


    } catch (error) {
        res.json({ Error: error })
        console.log("el error ", error)
    }
})

country_route.put('/country', async (req, res) => {
    //verificar token
    //Verificar newName para no crear duplicados
    try {
        const verifyCountry = await Country.findAll({
            where: { name: req.body.name }
        })
        if (verifyCountry == 0) return res.status('403').json({ mensaje: `${req.body.name} no existe` })
        //revisar que req.body.newName no exista
        //si pasa, actualizar

        await Country.update({ name: req.body.newName }, {
            where: { name: req.body.name }
        })
        const verifyCountry2 = await Country.findAll({
            where: { name: req.body.newName }
        })
        res.status(200).json({ newName: verifyCountry2[0].name })

    } catch (error) {
        console.log("el error ", error)
    }
})

country_route.delete('/country', async (req, res) => {
    //verificar token
    //
    try {
        const verifyCountry = await Country.findAll({
            where: { name: req.body.name }
        })
        if (verifyCountry == 0) return res.status('403').json({ mensaje: `${req.body.name} no existe` })

        await Country.destroy({
            where: { name: req.body.name }
        })
        res.status(200).json({ Name: `Registro ${req.body.name} eliminado` })

    } catch (error) {
        res.json({ Error: error })
        console.log("el error ", error)
    }
})
//get all countries
country_route.get('/countries', async (req, res) => {
    //verificar el token
    try {
        const queryCountry = await Country.findAll({
            attributes: ['name'],
        })
        console.log(queryCountry)
        if (queryCountry.length == 0) return res.status('403').json({ mensaje: `${country} no existe` })
        res.status(200).send(queryCountry)


    } catch (error) {
        res.json({ Error: error })
        console.log("el error ", error)
    }
})
//Exports
module.exports = { country_route, Country }