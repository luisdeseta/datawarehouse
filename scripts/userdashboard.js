import { fetchdata } from './fetchdata.js';


//constantes
const NAME = document.querySelector('#name');
const LASTNAME = document.querySelector('#lastName');
const EMAIL = document.querySelector('#emailInput');
const PROFILE = document.querySelector('#profile');
const PASS = document.querySelector('#inputPassword');
const USERBTN = document.querySelector('#createUserbtn');

const urlUSER = `http://localhost:3010/api/user`;

const create = () =>{
    const data = {
        first_name: NAME.value,
        last_name: LASTNAME.value,
        email: EMAIL.value,
        password: PASS.value,
        profile: PROFILE.value
    }
    
    //console.log('create => '+data)
    fetchdata(urlUSER, "POST", data)
    .then((res)=>{
        console.log("creatUser res => ", res)

    })
    .catch((err)=>{
        console.log('error =>', err)
    })
}


USERBTN.addEventListener('click', create)