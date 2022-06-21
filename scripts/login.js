import {apiLogin } from '../routes/services.js';
import { fetchdata } from '../routes/fetchdata.js';

//FRONT END

//constantes
const userLogin = document.querySelector('#userLogin');
const userPass = document.querySelector('#userPass');
const btnLogin = document.querySelector('#btnLogin');
const urlLogin = `http://localhost:3010/admin/login`;
const urlUSER = `http://localhost:3010/api/user/login`;


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
    fetchdata(urlLogin,"POST", data)
    .then((res) => {
        //console.log('data login: ', data)
        console.log('then login res: ', res);
        //console.log('then login res token: ', res.token);
       try {
           if(!res.token) {
               return console.log('Error al hacer login')
           } else {
               localStorage.setItem("token", res.token) // es la respuesta del backend, el "res" trae el token
               window.location.href = '../pages/userslist.html'; //esto hay que pasarlo al index. en un app.use y poner el middleware

           }
       } catch (error) {
           
       }
        })
    .catch((err) =>{
            console.log('error',err);
        })
 

}


btnLogin.addEventListener('click', login);
btnLogin.addEventListener('keypress', (z)=>{ if(z.keyCode === 13) return login })
//btnLogin.addEventListener('pres')