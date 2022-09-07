const cont_channels = require('express').Router();
const bcrypt = require('bcrypt');
const validator = require('validator');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const sequelize = require('../services/conection');
const { Sequelize, DataTypes, Model, QueryTypes, Op } = require('sequelize');
const expressJwt = require('express-jwt');
const req = require('express/lib/request');
const expJWT = expressJwt({ secret: process.env.SECRET_TOKEN, algorithms: ['HS512'] });



//usar cont_channels para las rutas de contact_channels

//modelo de Contact_Channels

const ContChannels = sequelize.define("contact_channels", {
    contacts_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "el campo Contacts_ID no puede ser null" }
        }
    },
    channels_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            notNull: { msg: "el campo channels_id no puede ser null" }
        }
    },
    account: {
        type: DataTypes.STRING,

    },
    preference: {
        type: DataTypes.STRING,

    }
},
    { timestamps: false, }
)

//crear contact_channels
cont_channels.post('/create', async (req, res) => {
    //Verificar si el contact_channels existe
    const verifyContact = await ContChannels.findAll({
        where: { contacts_id: req.body.contacts_id }
    })
    if (verifyContact.length != 0) return res.status('403').json({ mensaje: `${req.body.contacts_id} ya existe` })
    try {
        const newContact = await ContChannels.create({
            contacts_id: req.body.contacts_id,
            channels_id: req.body.channels_id,
            account: req.body.account,
            preference: req.body.preference,
        })
        res.status(200).json({ Mensaje: `Contacto ${newContact.contacts_id} & Channels ${newContact.channels_id} creado con éxito` })
    } catch (error) {
        res.json({ error });
        console.log("Contact & Channels error", error)
    }
})
//buscar un contacto
cont_channels.get('/get/:ID', async (req, res) => {
    try {
        const { ID } = req.params;
        const query = await ContChannels.findAll({
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
//buscar todos los contactos
cont_channels.get('/getall', async (req, res) => {
    try {
        const query = await ContChannels.findAll({
        });
        res.status(200).json({ query })
        console.log(query);

    } catch (error) {
        res.status(400).json({ Status: "Error en la sentencia SQL" })
    }
})

//actualizar contactos
cont_channels.put('/update', async (req, res) => {
    try {
        //verificar duplicados
        const verifyContact = await ContChannels.findAll({
            where: { id: req.body.id }
        })
        if (verifyContact == 0) return res.status('403').json({ mensaje: `${req.body.id} no existe` })

        await ContChannels.update({
            contacts_id: req.body.contacts_id,
            channels_id: req.body.channels_id,
            account: req.body.account,
            preference: req.body.preference,
        },
            { where: { id: verifyContact[0].id } }
        )
        res.status(200).json({ Status: `Contacto ${verifyContact[0].contact_id}, ${verifyContact[0].account}  actualizada!` })

    } catch (error) {
        res.status(401).json({ Status: 'Error en la sentencia SQL', error })
    }
})

//eliminar contactos
cont_channels.delete('/delete/:id', async (req, res) => {
    //
    try {
        const { id } = req.params
        const deleteContact = await ContChannels.findAll({
            where: { id: id }
        })
        if (deleteContact.length === 0) return res.status('403').json({ mensaje: `Contacto no existe` })
        await ContChannels.destroy({
            where: { id: id }
        })
        res.status(200).json({ Status: `Contacto ${deleteContact[0].id}  borrado!` })

    } catch (error) {
        res.status(401).json({ Status: 'Error en la sentencia SQL', error })
    }
})

//Exports
module.exports = { cont_channels, ContChannels }