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
contact.get('/getall', async (req, res) => {
    try {
        const contacts = await Contact.findAll({
        });
        res.status(200).json({ contacts })
        console.log(contacts);

    } catch (error) {
        res.status(400).json({ Status: "Error en la sentencia SQL" })
    }
})

//actualizar contactos
contact.put('/update', async (req, res) => {
    try {
        //verificar duplicados
        const verifyContact = await Contact.findAll({
            where: { first_name: req.body.first_name }
        })
        if (verifyContact == 0) return res.status('403').json({ mensaje: `${req.body.first_name} no existe` })

        await Contact.update({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            job_title: req.body.job_title,
            email: req.body.email,
            company_id: req.body.company_id,
            city_id: req.body.city_id,
            address: req.body.address,
            interest: req.body.interest
        },
            { where: { id: verifyContact[0].id } }
        )
        res.status(200).json({ Status: `Contacto ${verifyContact[0].first_name}  actualizada!` })

    } catch (error) {
        res.status(401).json({ Status: 'Error en la sentencia SQL', error })
    }
})

//eliminar contactos
contact.delete('/delete/:id', async (req, res) => {
    //
    try {
        const { id } = req.params
        const deleteContact = await Contact.findAll({
            where: { id: id }
        })
        if (deleteContact.length === 0) return res.status('403').json({ mensaje: `Contacto no existe` })
        await Contact.destroy({
            where: { id: id }
        })
        res.status(200).json({ Status: `Contacto ${deleteContact[0].first_name}  borrado!` })

    } catch (error) {
        res.status(401).json({ Status: 'Error en la sentencia SQL', error })
    }
})

//Exports
module.exports = { contact, Contact }