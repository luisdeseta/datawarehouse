//constantes
const jwt = require('jsonwebtoken');

// usar solo el JWT sacar el 
//const expressJwt = require('express-jwt');
//const expJWT = expressJwt({ secret: process.env.SECRET_TOKEN, algorithms: ['HS512'] });

/**
 * TODO 
 * Validar usuario
 * Validar Admin para rutas protegidas
 */
const isAdmin = (req, res, next) =>{
    //token
    const authHeader = req.header('Authorization');
    //const token = req.header('Authorization');
    const token = authHeader.split(' ')[1];
    console.log('isAdmin => '+token);
    if (!token) return res.status(401).json({ error: 'Acceso denegado' });
    try {
        const verified = jwt.verify(token, process.env.SECRET_TOKEN)
        req.user = verified
        next() // continuamos
    } catch (error) {
        res.status(400).json({error: 'token no es válido'})
    }
    //if

}

module.exports = isAdmin;
