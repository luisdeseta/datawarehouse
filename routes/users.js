const router = require('express').Router();
const bcrypt = require('bcrypt');
const validator = require('validator');
require('dotenv').config()
const jwt = require('jsonwebtoken');
const sequelize = require('../services/conection');
const { Sequelize, DataTypes, Model, QueryTypes, Op } = require('sequelize');
const req = require('express/lib/request');
const expressJwt = require('express-jwt');
const expJWT = expressJwt({ secret: process.env.SECRET_TOKEN, algorithms: ['HS512'] });


//creacion del modelo de usuario (sequelize)
const User = sequelize.define("users", {
    first_name: DataTypes.TEXT,
    last_name: DataTypes.TEXT,
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: { msg: "Revise el formato del email" },
            notNull: { msg: "el email no puede ser null" }
        }
    },
    password: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: { msg: "password no puede ser null" }
        }
    },
    profile: {
        type: DataTypes.TEXT,
        allowNull: true,
    }
},
    { timestamps: false, }
)

//Crear el usuario admin
//TODO poner un IF para no crear infinitos admin
router.post('/createadmin', async (req, res) => {
    try {
        const salt = await bcrypt.genSalt(10);
        const admin = await User.create({
            first_name: 'admin',
            last_name: 'admin',
            email: 'admin@email.com.ar',
            password: await bcrypt.hash('admin123', salt),
            profile: 'A'
        })
        res.json({ Mensaje: `Usuario ${admin.email} creado con éxito` });

    } catch (error) {
        res.json(`Èrror ${error}`);
    }


})

//login de usuarios
router.post('/user/login', async (req, res) => {
    //busco por email
    const userLogin = await User.findAll({
        where: {
            [Op.or]: [{ email: req.body.usuario }, { first_name: req.body.usuario }]
        }

    });
    console.log("userLogin " + userLogin[0].password)
    if (userLogin == 0) return res.status(400).json({ Mensaje: "Email o password incorrecto!!" });
    //Valido pass
    const userPass = await bcrypt.compare(req.body.pass, userLogin[0].password);
    if (!userPass) return res.status(400).json({ Mensaje: "Email o password incorrecto!!" });
    console.log('userPass ' + userPass);
    //Creo el token con jwt
    const token = jwt.sign({
        email: userLogin[0].email,
        password: userLogin[0].password,
        profile: userLogin[0].profile
    }, process.env.SECRET_TOKEN,
        { algorithm: 'HS512' });

    res.status(200).json({ token });
    //res.header('Authorization', token).json({token});
})//end login

router.get('/testing', expJWT, async (req, res) => {
    const token = req.header('Authorization');
    console.log(token);
    res.status(200).json(token);

})
//USUARIOS: Son las personas que usan el sistema

//Crear usuario nuevo
router.post('/user/', async (req, res) => {
    /* la validación la hace el middleware  */
    try {
        //HASH password
        const saltos = await bcrypt.genSalt(10);
        const pass = await bcrypt.hash(req.body.password, saltos);
        //crear usuario
        const newUser = await User.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
            password: pass,
            profile: req.body.profile
        })
        res.status(200).json({ Mensaje: `Usuario creado con éxito`, newUser });

    } catch (error) {
        res.status(400).json({ Mensaje: "no se pudo crear el usuario", Error: error })
    }
})

//Consultar usuarios
router.get('/user/:nameSearch', async (req, res) => {

    try {
        const { nameSearch } = req.params;
        //busqueda por nombre o por email
        const users = await User.findAll({
            where: {
                [Op.or]: [{ first_name: { [Op.like]: `%${nameSearch}%` } },
                { email: { [Op.like]: `%${nameSearch}%` } }]
            }
        });
        res.status(200).json({ users })
        console.log("get User ", users);

    } catch (error) {
        res.status(400).json({ Status: "Error en la sentencia SQL" })
    }
})



router.get('/allusers', async (req, res) => {

    try {
        const users = await User.findAll({
        });
        res.status(200).json({ users })
        console.log(users);

    } catch (error) {
        res.status(400).json({ Status: "Error en la sentencia SQL" })
    }
})


//Borrar usuario
router.delete('/user/:id', async (req, res) => {

    try {
        const { id } = req.params
        const deleteUser = await User.destroy({
            where: { id: id }
        });
        if (deleteUser === 0) {
            res.status(404).json({ Status: "Usuario no encontrado" })
        } else {
            res.status(200).json({ Status: `Usuario borrado!` })

        }
    } catch (error) {
        res.status(401).json({ Status: "Error en la sentencia SQL", error })
    }

})

//Actualizar usuario
router.put('/user', async (req, res) => {
    /*     console.log("user role  " + req.user.profile)
        if (req.user.profile != "A") return res.status(401).json({Status: "acceso denegado"}); */
    //TODO primero buscar y luego actualizar
    try {
        const userUpdate = await sequelize.query(`
        UPDATE users set first_name = :_first_name, last_name = :_last_name, 
        email = :_email, password = :_password, profile = :_profile,
        id = :_id
        WHERE id = :_id
        `, {
            type: QueryTypes.UPDATE,
            replacements: {
                _id: req.body.id,
                _first_name: req.body.first_name || undefined,
                _last_name: req.body.last_name || undefined,
                _email: req.body.email || undefined,
                _password: await bcrypt.hash(req.body.password, await bcrypt.genSalt(10)),
                _profile: req.body.profile || undefined
            }
        })
        console.log("userUpdate ", userUpdate)
        res.status(200).json({
            Status: "Usuario Actualizado con éxito"
        });

    } catch (error) {
        res.status(401).json({ Status: "Error en la sentencia SQL" })
    }
})
//Exports
module.exports = { router, User }

