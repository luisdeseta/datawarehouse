//PETICIONES PARA JSTREE
const route_tree = require('express').Router();
const sequelize = require('../services/conection');
const { Sequelize, DataTypes, Model, QueryTypes, Op } = require('sequelize');
const req = require('express/lib/request');

//importo los modelos
const { region_route, Region } = require('../backend/region');
const { country_route, Country } = require('../backend/country');
const { city_route, City } = require('../backend/city');
const bodyParser = require('body-parser');


//relaciones entre modelos/tablas
Region.hasMany(Country, {
    foreignKey: 'regions_id'
});
Country.belongsTo(Region, {
    foreignKey: 'regions_id'
});
Country.hasMany(City, {
    foreignKey: 'country_id'
});
City.belongsTo(Country, {
    foreignKey: 'country_id'
})

route_tree.get('/allzz', async (req, res) => {
    //verificar el token
    //'data' no se dibuja en el arbol pero guarda la información en el objeto
    try {
        const regions = await Region.findAll(
            {
                //entre [] es igual a "AS"
                attributes: ['id', 'parent', ['name', 'text'], 'data']
            }

        );
        const country = await Country.findAll(
            {
                attributes: ['id', ['regions_id', 'parent'], ['name', 'text'], 'data']
            }
        );
        const city = await City.findAll(
            {
                attributes: ['id', ['country_id', 'parent'], ['name', 'text'], 'data']
            }
        );

        const tree = [];
        const tree2 = [];
        const tree3 = [];
        for (let r = 0; r < regions.length; r++) {
            tree.push(regions[r]);

        }
        for (let c = 0; c < country.length; c++) {
            tree.push(country[c]);

        }
        for (let i = 0; i < city.length; i++) {
            tree.push(city[i]);

        }
        //console.log("tree ", tree)
        res.status(200).send(tree);
    } catch (error) {
        res.json({ Error: error })
        console.log("el error ", error)
    }


})

route_tree.get('/alltest', async (req, res) => {
    //verificar el token
    try {
        const jstreeNode = [
            { "id": "ajson1", "parent": "#", "text": "Region1", "data": "a" },
            { "id": "ajson2", "parent": "#", "text": "Region 2", "data": "a" },
            { "id": "ajson3", "parent": "ajson2", "text": "Carlos", "data": "b" },
            { "id": "ajson4", "parent": "ajson2", "text": "juan carlos", "data": "b" },
        ]

        res.status(200).send(jstreeNode);
    } catch (error) {
        res.json({ Error: error })
        console.log("el error ", error)
    }


})
module.exports = { route_tree, Region, Country, City }