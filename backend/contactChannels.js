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
cont_channels.post('/contactchannels', async (req, res) => {
    //Verificar si el contact_channels existe
    /* const verifyContact = await ContChannels.findAll({
        where: { contacts_id: req.body.contacts_id }
    })
    if (verifyContact.length != 0) return res.status('403').json({ mensaje: `${req.body.contacts_id} ya existe` }) */
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

//crear bulk contact_channels
cont_channels.post('/contactchannels/creates', async (req, res) => {
    //Verificar si el contact_channels existe
    /* const verifyContact = await ContChannels.findAll({
        where: { contacts_id: req.body.contacts_id }
    })
    if (verifyContact.length != 0) return res.status('403').json({ mensaje: `${req.body.contacts_id} ya existe` }) */

    try {
        const newContact = await ContChannels.bulkCreate(
            [{
                contacts_id: req.body[0].contacts_id,
                channels_id: req.body[0].channels_id,
                account: req.body[0].account,
                preference: req.body[0].preference
            },
            {
                contacts_id: req.body[1].contacts_id,
                channels_id: req.body[1].channels_id,
                account: req.body[1].account,
                preference: req.body[1].preference
            },
            {
                contacts_id: req.body[2].contacts_id,
                channels_id: req.body[2].channels_id,
                account: req.body[2].account,
                preference: req.body[2].preference
            },
            {
                contacts_id: req.body[3].contacts_id,
                channels_id: req.body[3].channels_id,
                account: req.body[3].account,
                preference: req.body[3].preference
            },
            {
                contacts_id: req.body[4].contacts_id,
                channels_id: req.body[4].channels_id,
                account: req.body[4].account,
                preference: req.body[4].preference
            }
            ],
            {
                updateOnDuplicate: ["account", "preference"]
            })

        //console.log("newContacts", newContact)
        res.status(200).json({ Mensaje: `Contactos & Channels creados con éxito` })
    } catch (error) {
        res.json({ error });
        console.log("Contact & Channels error", error)
    }
})

//buscar un contacto&canal
cont_channels.get('/contactchannels/:ID', async (req, res) => {
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
//buscar un contacto&canal por ID de contacto
cont_channels.get('/contactchannels/contact/:ID/:CHANNEL', async (req, res) => {
    try {
        const { ID, CHANNEL } = req.params;
        const query = await ContChannels.findAll({
            where: {
                contacts_id: [ID],
                channels_id: [CHANNEL]
            }
        })
        console.log(query)
        if (query.length == 0) return res.status('403').json({ mensaje: `${ID} no tiene datos` })
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
cont_channels.put('/contactchannels', async (req, res) => {
    try {
        //verificar duplicados
        /*         const verifyContact = await ContChannels.findAll({
                    where: { id: req.body.id }
                })
                if (verifyContact == 0) return res.status('403').json({ mensaje: `${req.body.id} no existe` }) */
        //Se puede actualizar masivamente con bulkCreate y updateOnDuplicate
        const query = await ContChannels.bulkCreate(
            [{
                id: req.body[0].id,
                contacts_id: req.body[0].contacts_id,
                channels_id: req.body[0].channels_id,
                account: req.body[0].account,
                preference: req.body[0].preference
            },
            {
                id: req.body[1].id,
                contacts_id: req.body[1].contacts_id,
                channels_id: req.body[1].channels_id,
                account: req.body[1].account,
                preference: req.body[1].preference
            },
            {
                id: req.body[2].id,
                contacts_id: req.body[2].contacts_id,
                channels_id: req.body[2].channels_id,
                account: req.body[2].account,
                preference: req.body[2].preference
            },
            {
                id: req.body[3].id,
                contacts_id: req.body[3].contacts_id,
                channels_id: req.body[3].channels_id,
                account: req.body[3].account,
                preference: req.body[3].preference
            },
            {
                id: req.body[4].id,
                contacts_id: req.body[4].contacts_id,
                channels_id: req.body[4].channels_id,
                account: req.body[4].account,
                preference: req.body[4].preference
            }
            ],
            {
                updateOnDuplicate: ["account", "preference"]
            })


        //res.status(200).json({ Status: `Contacto Contact & Channels actualizados!!` })
        res.status(201).json({ query })

    } catch (error) {
        res.status(401).json({ Status: 'Error en la sentencia SQL', error })
    }
})

//eliminar contactos&canales
cont_channels.delete('/contactchannels/:id', async (req, res) => {
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