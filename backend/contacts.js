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

//importo los modelos
const { region_route, Region } = require('../backend/region');
const { country_route, Country } = require('../backend/country');
const { city_route, City } = require('../backend/city');
const { Company } = require('../backend/company');
const { ContChannels } = require('../backend/contactChannels');
const bodyParser = require('body-parser');

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
contact.post('/contact', async (req, res) => {
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
        res.status(200).json({ Mensaje: `Contacto ${newContact.email} creado con éxito`, newContact: newContact.id })
    } catch (error) {
        res.json({ error });
        console.log("Contact error", error)
    }
})

/////
contact.get('/contact/?', async (req, res) => {
    const { name } = req.query

    try {
        let find = "SELECT `contact`.`id` , `contact`.`first_name`, `contact`.`last_name`, `contact`.`job_title`, `contact`.`email`, `contact`.`company_id`, `contact`.`city_id`, `contact`.`address`, `contact`.`interest`, `city`.`id` AS `city.id`, `city`.`country_id` AS `city.country_id`, `city`.`name` AS `city.name`, `city->country`.`id` AS `city.country.id`, `city->country`.`regions_id` AS `city.country.regions_id`, `city->country`.`name` AS `city.country.name`, `city->country->region`.`id` AS `city.country.region.id`, `city->country->region`.`name` AS `city.country.region.name`, `city->country->region`.`parent` AS `city.country.region.parent`, `company`.`id` AS `company.id`, `company`.`name` AS `company.name`, `company`.`address` AS `company.address`, `company`.`email` AS `company.email`, `company`.`phone` AS `company.phone`, `company`.`city_id` AS `company.city_id` FROM `contacts` AS `contact` LEFT OUTER JOIN `cities` AS `city` ON `contact`.`city_id` = `city`.`id` LEFT OUTER JOIN `countries` AS `city->country` ON `city`.`country_id` = `city->country`.`id` LEFT OUTER JOIN `regions` AS `city->country->region` ON `city->country`.`regions_id` = `city->country->region`.`id` LEFT OUTER JOIN `companies` AS `company` ON `contact`.`company_id` = `company`.`id` WHERE (`city`.`name` LIKE :_search OR`city`.`name` LIKE :_search OR `city->country`.`name` LIKE :_search OR`city->country->region`.`name` LIKE :_search OR `city->country->region`.`name` LIKE :_search OR `contact`.`first_name` LIKE :_search OR `contact`.`last_name` LIKE :_search OR `contact`.`email` LIKE :_search OR `contact`.`job_title` LIKE :_search OR `contact`.`address` LIKE :_search OR `company`.`name` LIKE :_search)"
        const query = await sequelize.query(find,

            {
                type: QueryTypes.SELECT,
                replacements: {
                    _search: `%${name || ""}%`
                }
            }
        )
        res.status(200).json({ query })

    } catch (error) {
        res.json({ Error: error })
        console.log("el error ", error)
    }


})
/////
//buscar un contacto
contact.get('/contactzz/:contactName', async (req, res) => {
    try {
        const { contactName } = req.params;



        // INTENTAR CON UNA RAW QUERY
        const query = await Contact.findAll(
            {
                include: [
                    {
                        model: City,
                        //required: false,

                        include: [{
                            model: Country,
                            include: [{
                                model: Region,
                            }]
                        }]
                    },
                    Company

                ],
                where: {
                    [Op.or]: [
                        { first_name: { [Op.like]: `%${contactName}%` } },
                        { last_name: { [Op.like]: `%${contactName}%` } },
                        { email: { [Op.like]: `%${contactName}%` } },
                        { job_title: { [Op.like]: `%${contactName}%` } },
                        { address: { [Op.like]: `%${contactName}%` } },

                    ],

                }
            }

        )


        res.status(200).json({ query })

    } catch (error) {

        res.json({ Error: error })
        console.log("el error ", error)
    }


})


//buscar todos los contactos
contact.get('/getall', async (req, res) => {
    try {
        const query = await Contact.findAll({
        });
        res.status(200).json({ query })
        console.log(query);

    } catch (error) {
        res.status(400).json({ Status: "Error en la sentencia SQL" })
    }
})

//actualizar contactos
contact.put('/contact', async (req, res) => {
    try {
        //verificar duplicados
        const query = await Contact.findAll({
            where: { email: req.body.email }
        })
        if (query == 0) return res.status('403').json({ mensaje: `${req.body.email} no existe` })

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
            { where: { id: query[0].id } }
        )
        res.status(200).json({ Status: `Contacto ${query[0].first_name}  actualizada!` })

    } catch (error) {
        res.status(401).json({ Status: 'Error en la sentencia SQL', error })
    }
})

//eliminar contactos
contact.delete('/contact/', async (req, res) => {
    //Recive un array con los ids
    const { ids } = req.body
    try {
        let dele = "DELETE FROM `contacts` WHERE `id` IN (:_delete)"
        let find = "SELECT `id`, `first_name`, `last_name`, `job_title`, `email`, `company_id`, `city_id`, `address`, `interest` FROM `contacts` AS `contact` WHERE `contact`.`id` IN (:_search)"
        const deleteContact = await sequelize.query(find,
            {
                type: QueryTypes.SELECT,
                replacements: {
                    _search: ids
                }
            })
        if (deleteContact.length === 0) return res.status('403').json({ mensaje: `el Contacto no existe!!!! :C` })
        console.log("deleteContact ", deleteContact)
        const query = await sequelize.query(dele,

            {
                type: QueryTypes.DELETE,
                replacements: {
                    _delete: ids
                }
            }
        )
        res.status(200).json({ Status: `Contacto  borrado :D ` })

    } catch (error) {
        res.status(401).json({ Status: 'Error en la sentencia SQL', error })
    }
})


//join para traer city contact y companies
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

//join entre contacts y city
City.hasMany(Contact, {
    foreignKey: 'city_id'
})
Contact.belongsTo(City, {
    foreignKey: 'city_id'
})



//join entre contact y company
Company.hasMany(Contact, {
    foreignKey: 'company_id'
})
Contact.belongsTo(Company, {
    foreignKey: 'company_id'
})

contact.get('/allcontactinfo/', async (req, res) => {
    //const { idContact } = req.params;
    try {
        const query = await Contact.findAll(
            {
                include: [
                    {
                        model: City,
                        include: [{
                            model: Country,
                            include: [{
                                model: Region
                            }]
                        }]
                    },
                    Company
                ],
                //where: { id: { [Op.like]: `%${idContact}%` } }
            }

        )


        res.status(200).json({ query })

    } catch (error) {

        res.json({ Error: error })
        console.log("el error ", error)
    }

})



//Exports
module.exports = { contact, Contact }