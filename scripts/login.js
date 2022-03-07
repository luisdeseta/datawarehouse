import {apiLogin } from '../services/services.js';

//constantes
const userLogin = document.querySelector('#userLogin');
const userPass = document.querySelector('#userPass');
const btnLogin = document.querySelector('#btnLogin');

/**
 * Login
 */
const login = () =>{
    const data = {
        usuario: userLogin.value,
        pass: userPass.value
    };
    console.log('data:', data);
    apiLogin(data)
    .then((res) => {
        console.log('then: ', res);
        window.location.href = '../pages/login.html';
        })
    .catch((err) =>{
            console.log('error',err);
        })


}

btnLogin.addEventListener('click', login);
//btnLogin.addEventListener('pres')