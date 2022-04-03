import {apiLogin } from '../services/services.js';

//constantes
const userLogin = document.querySelector('#userLogin');
const userPass = document.querySelector('#userPass');
const btnLogin = document.querySelector('#btnLogin');



/**
 * Login
 */
const login = () =>{
    //event.preventDefault() 
    const data = {
        usuario: userLogin.value,
        pass: userPass.value
    };
    //console.log("login")
    apiLogin(data)
    .then((res) => {
        console.log('then: ', res);
        window.location.href = '../pages/user.html'; //esto hay que pasarlo al index. en un app.use y poner el middleware
        })
    .catch((err) =>{
            console.log('error',err);
        })
 

}

btnLogin.addEventListener('click', login);
btnLogin.addEventListener('keypress', (z)=>{ if(z.keyCode === 13) return login })
//btnLogin.addEventListener('pres')