const channels = require('express').Router();
const bcrypt = require('bcrypt');
const validator = require('validator');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const sequelize = require('../services/conection');
const { Sequelize, DataTypes, Model, QueryTypes, Op } = require('sequelize');
const expressJwt = require('express-jwt');
const req = require('express/lib/request');
const expJWT = expressJwt({ secret: process.env.SECRET_TOKEN, algorithms: ['HS512'] });



//usar channels para las rutas de channels

//modelo de Channels

const Channels = sequelize.define("channels", {
    /*     id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            defaultValue: DataTypes.autoIncrement,
            primaryKey: true,
    
        }, */
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "el campo name no puede ser null" }
        }
    }
},
    { timestamps: false, }
)

//crear channels
channels.post('/create', async (req, res) => {
    //Verificar si el contact_channels existe
    const verifyChannels = await Channels.findAll({
        where: { name: req.body.name }
    })
    console.log("verifyChannels", verifyChannels)
    if (verifyChannels.length != 0) return res.status('403').json({ mensaje: `${req.body.name} ya existe` })
    try {
        const newChannels = await Channels.create({

            name: req.body.name,

        })
        res.status(200).json({ Mensaje: `Channels ${newChannels.name} creado con éxito` })
    } catch (error) {
        res.json({ error });
        console.log("Channels error", error)
    }
})
//buscar un channels
channels.get('/get/:ID', async (req, res) => {
    try {
        const { ID } = req.params;
        const query = await Channels.findAll({
            where: { id: { [Op.like]: `%${ID}%` } }
        })
        console.log(query)
        if (query.length == 0) return res.status('403').json({ mensaje: `${ID} no existe` })
        res.status(200).json({
            query
        })


    } catch (error) {
        res.json({ error })
        console.log("error  ", error)
    }
})
//buscar todos los channels
channels.get('/getall', async (req, res) => {
    try {
        const query = await Channels.findAll({
        });
        res.status(200).json({ query })
        console.log(query);

    } catch (error) {
        res.status(400).json({ Status: "Error en la sentencia SQL" })
    }
})

//actualizar channels
channels.put('/update', async (req, res) => {
    try {
        //verificar duplicados
        const verifyChannels = await Channels.findAll({
            where: { name: req.body.name }
        })
        if (verifyChannels == 0) return res.status('403').json({ mensaje: `${req.body.name} no existe` })

        await Channels.update({
            name: req.body.Newname

        },
            { where: { id: verifyChannels[0].id } }
        )
        res.status(200).json({ Status: `Channels ${verifyChannels[0].name} actualizada!` })

    } catch (error) {
        res.status(401).json({ Status: 'Error en la sentencia SQL', error })
    }
})

//eliminar channels
channels.delete('/delete/:id', async (req, res) => {
    //
    try {
        const { id } = req.params
        const deleteChannels = await Channels.findAll({
            where: { id: id }
        })
        if (deleteChannels.length === 0) return res.status('403').json({ mensaje: `Channels no existe` })
        await Channels.destroy({
            where: { id: id }
        })
        res.status(200).json({ Status: `Channels ${deleteChannels[0].name}  borrado!` })

    } catch (error) {
        res.status(401).json({ Status: 'Error en la sentencia SQL', error })
    }
})

//Exports
module.exports = { channels, Channels }