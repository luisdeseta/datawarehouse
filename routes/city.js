const city_route = require('express').Router();
const bcrypt = require('bcrypt');
const validator = require('validator');
require('dotenv').config();
const jwt = require('jsonwebtoken');
const sequelize = require('../services/conection');
const { Sequelize, DataTypes, Model, QueryTypes, Op } = require('sequelize');
const expressJwt = require('express-jwt');
const req = require('express/lib/request');

// Creacion del modelo de ciudades
const City = sequelize.define("cities", {
    country_id: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "el campo country no puede ser null" }
        }
    },
    name: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "el campo city no puede ser null" }
        }
    },

},
    { timestamps: false, }
)

city_route.post('/city', async (req, res) => {
    //Verifica si el pais ya existe
    const verifyCity = await City.findAll({
        where: { name: req.body.name }
    })
    if (verifyCity.length != 0) return res.status('403').json({ mensaje: `${req.body.name} ya existe` })
    try {
        const newCity = await City.create({
            country_id: req.body.parent,
            name: req.body.name
        })
        res.json({ Mensaje: `City ${req.body.name} creado con éxito` });

    } catch (error) {
        res.json({ Error: error })
        console.log("el error ", error)
    }
})

city_route.get('/city/:city', async (req, res) => {
    //verificar el token
    try {
        const { city } = req.params;
        const query = await City.findAll({
            where: { [Op.or]: [{ id: { [Op.like]: `${city}` } }, { name: { [Op.like]: `%${city}%` } }] }
        })
        console.log(query)
        if (query.length == 0) return res.status('403').json({ mensaje: `${City} no existe` })
        res.status(200).json({
            query
        })


    } catch (error) {
        res.json({ Error: error })
        console.log("el error ", error)
    }
})

/**
 * Devuelve el listado de todas las ciudades
 */
city_route.get('/city/', async (req, res) => {
    //verificar el token
    try {
        const { city } = req.params;
        const query = await City.findAll({
            //where: { [Op.or]: [{ id: { [Op.like]: `%${city}%` } }, { name: { [Op.like]: `%${city}%` } }] }
        })
        console.log(query)
        if (query.length == 0) return res.status('403').json({ mensaje: `${City} no existe` })
        res.status(200).json({
            query
        })


    } catch (error) {
        res.json({ Error: error })
        console.log("el error ", error)
    }
})

/**
 * FILTRAR CIUDAD POR PAIS
 * Elijo un pais y filtra las ciudades para el 
 * pop up en el form de crear empresa
 *  */

//importo los modelos
const { Country } = require('../routes/country');
//armo las relaciones entre modelos
Country.hasMany(City, {
    foreignKey: 'country_id'
});
City.belongsTo(Country, {
    foreignKey: 'country_id'
})
//Ruta para buscar ciudades por pais
city_route.get('/citybycountry/?', async (req, res) => {
    try {
        const { country } = req.query;
        const query = await City.findAll({
            where: {
                [Op.or]: [{ country_id: { [Op.like]: `${country || "%"}` } },
                    //{ name: { [Op.like]: `%${city}%` } }

                ]
            }
            //where: { country_id: [`${country}`] },
            //attributes: ['name']
        })
        console.log(query)
        if (query.length == 0) return res.status('403').json({ mensaje: `${City} no existe` })
        res.status(200).json({
            query
        })


    } catch (error) {
        res.json({ Error: error })
        console.log("el error ", error)
    }
})



city_route.put('/city', async (req, res) => {
    //verificar token
    //Verificar newName para no crear duplicados
    try {
        const verifyCity = await City.findAll({
            where: { name: req.body.name }
        })
        if (verifyCity == 0) return res.status('403').json({ mensaje: `${req.body.name} no existe` })
        //revisar que req.body.newName no exista
        //si pasa, actualizar

        await City.update({ name: req.body.newName }, {
            where: { name: req.body.name }
        })
        const verifyCity2 = await City.findAll({
            where: { name: req.body.newName }
        })
        res.status(200).json({ newName: verifyCity2[0].name })

    } catch (error) {
        res.json({ Error: error })
        console.log("el error ", error)
    }
})

city_route.delete('/city', async (req, res) => {
    //verificar token
    //
    try {
        const verifyCity = await City.findAll({
            where: { name: req.body.name }
        })
        if (verifyCity == 0) return res.status('403').json({ mensaje: `${req.body.name} no existe` })

        await City.destroy({
            where: { name: req.body.name }
        })
        res.status(200).json({ newName: `Registro ${req.body.name} eliminado` })

    } catch (error) {
        res.json({ Error: error })
        console.log("el error ", error)
    }
})

//Exports
module.exports = { city_route, City }