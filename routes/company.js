const cia_route = require('express').Router();
const bcrypt = require('bcrypt');
const validator = require('validator');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const sequelize = require('../services/conection');
const { Sequelize, DataTypes, Model, QueryTypes, Op } = require('sequelize');
const req = require('express/lib/request');
//const expressJwt = require('express-jwt');
//const expJWT = expressJwt({ secret: process.env.SECRET_TOKEN, algorithms: ['HS512'] });



//creacion del modelo de compania (sequelize)

const Company = sequelize.define("companies", {

    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "el nombre de empresa no puede ser null" }
        }
    },
    address: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "la direaccion de empresa no puede ser null" }
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
    phone: DataTypes.TEXT,
    city_id: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notNull: { msg: "El codigo de ciudad no puede ser null" }
        }
    }
},
    { timestamps: false, }
)

//Crear compañia
cia_route.post('/cia', async (req, res) => {
    //verifica que la empresa existe
    const verifyCia = await Company.findAll({
        where: { name: req.body.name }
    })
    if (verifyCia.length != 0) return res.status('403').json({ mensaje: `la emprea ${req.body.name} ya existe` })
    try {
        const newCia = await Company.create({
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            city_id: req.body.city_id
        })
        res.json({ Mensaje: `Empresa ${req.body.name} creada con éxito` });
    } catch (error) {
        res.json({ Error: error })
        console.log("Modelo empresa Error ", error)

    }

})

//Eliminar compañia
cia_route.delete('/cia/:id', async (req, res) => {
    //
    try {
        const { id } = req.params
        const deleteCia = await Company.findAll({
            where: { id: id }
        })
        if (deleteCia.length === 0) return res.status('403').json({ mensaje: `Compañia no existe` })
        await Company.destroy({
            where: { id: id }
        })
        res.status(200).json({ Status: `Compañía ${deleteCia[0].name}  borrada!` })

    } catch (error) {
        res.status(401).json({ Status: 'Error en la sentencia SQL', error })
    }
})

//Editar compañia
cia_route.put('/cia', async (req, res) => {
    //
    try {
        const verifyCia = await Company.findAll({
            where: { id: req.body.id }
        })
        if (verifyCia.length === 0) return res.status('403').json({ mensaje: `La Compañia con ese ID no existe` })

        await Company.update({
            name: req.body.name,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            city_id: req.body.city_id
        },
            { where: { id: verifyCia[0].id } })
        res.status(200).json({ Status: `Compañía ${verifyCia[0].name}  actualizada!` })


    } catch (error) {
        res.status(401).json({ Status: 'Error en la sentencia SQL', error })
    }
})
//Traigo los modelos para poder traer el nombre de la cia
const { City } = require('../routes/city');
//armo las relaciones entre modelos
City.hasMany(Company, {
    foreignKey: 'city_id'
});
Company.belongsTo(City, {
    foreignKey: 'city_id'
})
cia_route.get('/cia/allcompanies', async (req, res) => {
    //
    try {
        const query = await Company.findAll({
            include: [
                { model: City }
            ]
        })
        res.status(200).json({ query })
    } catch (error) {
        res.json({ Error: error })
        res.status(400).json({ Status: "Error en la sentencia SQL" })
    }

})


//Obetener todas las compañías
cia_route.get('/cia/companies', async (req, res) => {
    //
    try {
        const query = await Company.findAll({
            //attributes: ['name'],
        })
        res.status(200).json({ query });
        console.log(query);

    } catch (error) {
        res.json({ Error: error })
        res.status(400).json({ Status: "Error en la sentencia SQL" })
    }

})
//Obtener una compañia
cia_route.get('/cia/:ciaName', async (req, res) => {
    try {
        const { ciaName } = req.params;
        const query = await Company.findAll({
            where: { [Op.or]: [{ name: { [Op.like]: `%${ciaName}%` } }] },
            include: [
                { model: City }
            ]
        })
        console.log("get cia ", query)
        if (query.length == 0) return res.status('403').json({ mensaje: `${ciaName} no existe` })
        res.status(200).json({ query })

    } catch (error) {
        res.json({ Error: error })
        console.log("Get Cia error ", error)
    }
})


//Exports
module.exports = { cia_route, Company }