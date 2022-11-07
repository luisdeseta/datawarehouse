import { apiLogin } from '../backend/services.js';
import { fetchdata, hideContact } from '../backend/fetchdata.js';
import { rutas } from '../frontend/rutas.js'


//FRONT END

//constantes
const userLogin = document.querySelector('#userLogin');
const userPass = document.querySelector('#userPass');
const btnLogin = document.querySelector('#btnLogin');
const urlLogin = rutas.urlLogin;
const urlUSER = rutas.urlUSER;
//const userDiv = document.querySelector('#userDiv');


/**
 * Login
 */
const login = () => {
    //event.preventDefault() 
    const data = {
        usuario: userLogin.value,
        pass: userPass.value
    };
    //console.log("login")
    fetchdata(urlLogin, "POST", data)
        .then((res) => {
            //console.log('data login: ', data)
            //console.log('then login res: ', res.p);


            try {
                if (!res.token) {
                    return console.log('Error al hacer login')
                } else {
                    localStorage.setItem("token", res.token) // es la respuesta del backend, el "res" trae el token
                    sessionStorage.setItem("p", res.p) //no es seguro en el sessionStorage
                    window.location.href = '../pages/contacts.html'; //esto hay que pasarlo al index. en un app.use y poner el middleware

                }
            } catch (error) {

            }
        })
        .catch((err) => {
            console.log('error', err);
        })


}
//oculta la seccion de usuarios
//hideContact(userDiv)

btnLogin.addEventListener('click', login);
btnLogin.addEventListener('keypress', (z) => { if (z.keyCode === 13) return login })
//btnLogin.addEventListener('pres')