import { fetchdata, getdata } from '../routes/fetchdata.js';
import { rutas } from '../scripts/rutas.js'

//constantes
const NAME = document.querySelector('#name');
const LASTNAME = document.querySelector('#lastName');
const EMAIL = document.querySelector('#emailInput');
const PROFILE = document.querySelector('#profile');
const PASS = document.querySelector('#inputPassword');
const confirmPASS = document.querySelector('#inputPassword2');
const ERRORPASS = document.querySelector('#errorPass')
const USERBTN = document.querySelector('#createUserbtn');
const userERROR = document.querySelector('#userError');

const urlUSER = rutas.urlUSER;

/**
 * Crea un usuario del sistema, solo un admin
 * Usurios duplicados se verifican el el backend
 */
const create = () => {
    const data = {
        first_name: NAME.value,
        last_name: LASTNAME.value,
        email: EMAIL.value,
        password: PASS.value,
        profile: PROFILE.value
    }
    if (PASS.value != confirmPASS.value) return ERRORPASS.innerHTML = `<h6>El password no coincide </h6>`
    fetchdata(urlUSER, "POST", data)
        .then((res) => {
            //console.log("creatUser res => ", res.Mensaje)
            if (res.Mensaje == "Usuario ya existe") return userERROR.innerHTML = `<h6> Usuario ya existe</h6>`
            alert(`Usuario ${res.newUser.email} creado con éxito!!`)
            window.location.href = '../pages/userslist.html';


        })
        .catch((err) => {
            console.log('error =>', err)
        })
}


USERBTN.addEventListener('click', create)