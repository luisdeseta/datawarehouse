const contact = require('express').Router();
const bcrypt = require('bcrypt');
const validator = require('validator');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const sequelize = require('../services/conection');
const { Sequelize, DataTypes, Model, QueryTypes, Op } = require('sequelize');
const expressJwt = require('express-jwt');
const req = require('express/lib/request');
const expJWT = expressJwt({ secret: process.env.SECRET_TOKEN, algorithms: ['HS512'] });

//constantes


//usar contact para las rutas de contactos.

//modelo de contacto
const Contact = sequelize.define("contact", {
    first_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "el campo first_name no puede ser null" }
        }
    },
    last_name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "el campo last_name no puede ser null" }
        }
    },
    job_title: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "el campo jobtible no puede ser null" }
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: { msg: "Revise el formato del email" },
            notNull: { msg: "el email no puede ser null" }
        }
    },
    company_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "el campo company_id  no puede ser null" }
        }
    },
    city_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "el campo company_id  no puede ser null" }
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "la direrccion de empresa no puede ser null" }
        }
    },
    interest: {
        type: DataTypes.STRING,

    }
},
    { timestamps: false, }
)

//crear contacto
contact.post('/create', async (req, res) => {
    //Verificar si el contacto existe
    const verifyContact = await Contact.findAll({
        where: { email: req.body.email }
    })
    if (verifyContact.length != 0) return res.status('403').json({ mensaje: `${req.body.email} ya existe` })
    try {
        const newContact = await Contact.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            job_title: req.body.job_title,
            email: req.body.email,
            company_id: req.body.company_id,
            city_id: req.body.city_id,
            address: req.body.address,
            interest: req.body.interest
        })
        res.status(200).json({ Mensaje: `Contacto ${newContact.email} creado con éxito` })
    } catch (error) {
        res.json({ error });
        console.log("Contact error", error)
    }
})
//buscar un contacto
contact.get('/get/:contactName', async (req, res) => {
    try {
        const { contactName } = req.params;
        const query = await Contact.findAll({
            where: { first_name: { [Op.like]: `%${contactName}%` } }
        })
        console.log(query)
        if (query.length == 0) return res.status('403').json({ mensaje: `${contactName} no existe` })
        res.status(200).json({
            query
        })


    } catch (error) {
        res.json({ error })
        console.log("error  ", error)
    }
})
//buscar todos los contactos

//actualizar contactos

//eliminar contactos


//Exports
module.exports = { contact, Contact }