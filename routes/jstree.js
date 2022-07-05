//PETICIONES PARA JSTREE
const route_tree = require('express').Router();
const sequelize = require('../services/conection');
const { Sequelize, DataTypes, Model, QueryTypes, Op } = require('sequelize');
const req = require('express/lib/request');

//importo los modelos
const { region_route, Region } = require('../routes/region');
const { country_route, Country } = require('../routes/country');
const { city_route, City } = require('../routes/city');
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
    try {
        const regions = await Region.findAll(
            {
                //entre [] es igual a "AS"
                attributes: ['id', 'parent', ['name', 'text']]
            }
            /* {attributes: ['id', 'parent', 'name'],
                include: [
                    //el include va "anidado"
                    {
                        model: Country, attributes: ['id', 'regions_id', 'name'], include: [
                            { model: City, attributes: ['id', 'country_id', 'name'] }]
                    },
                ]} */

        );
        const country = await Country.findAll(
            {
                attributes: ['id', ['regions_id', 'parent'], ['name', 'text']]
            }
        );
        const city = await City.findAll(
            {
                attributes: ['id', ['country_id', 'parent'], ['name', 'text']]
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
            { "id": "ajson1", "parent": "#", "text": "Region1" },
            { "id": "ajson2", "parent": "#", "text": "Region 2" },
            { "id": "ajson3", "parent": "ajson2", "text": "Carlos" },
            { "id": "ajson4", "parent": "ajson2", "text": "juan carlos" },
        ]

        res.status(200).send(jstreeNode);
    } catch (error) {
        res.json({ Error: error })
        console.log("el error ", error)
    }


})
module.exports = { route_tree }