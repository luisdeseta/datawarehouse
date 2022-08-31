import { fetchdata, getdata, deldata } from '../routes/fetchdata.js';
//constantes
const NAME = document.querySelector('#nameCia');
const CIASEARCHBTN = document.querySelector('#searchCiabtn');
const USERFORMUPDATE = document.querySelector('#UserFormUpdate');
const CIAFORMCONTAINER = document.getElementById('ciaFormContainer');

//constantes form creación actualización de cia
const ID = document.querySelector('#id');
const CIANAMEUPDATE = document.querySelector('#ciaNameForm');
const CIACITY = document.querySelector('#ciaCity');
const CIAADDRESS = document.querySelector('#ciaDirInput');
const CIAEMAIL = document.querySelector('#emailCiaInput');
const CIAPHONE = document.querySelector('#ciaPhone');
const ciaTable = document.querySelector('#testCompany');
const CIAADDBTN = document.querySelector('#createCiabtn');
const CANCELCIABTN = document.querySelector('#cancelCiarbtn');
const CIAFORM = document.querySelector('#createCiaForm');
//url fetch
const urlCIA = 'http://localhost:3010/company/cia/'

/**
 * Agrega una cía.
 */
const addCia = () => {
    //
    event.preventDefault()
    const data = {
        //id: ID.value,
        name: CIANAMEUPDATE.value,
        city_id: CIACITY.value,
        address: CIAADDRESS.value,
        email: CIAEMAIL.value,
        phone: CIAPHONE.value
    }
    fetchdata(urlCIA, 'POST', data)
        .then((res) => {
            console.log(res)
            CIAFORM.reset();
        })
        .catch((err) => {
            console.log("err create CIA", err)
        })
}


//listener
CIAADDBTN.addEventListener('click', addCia)