import { fetchdata, getdata, deldata } from '../routes/fetchdata.js';
import { rutas } from '../scripts/rutas.js'

//constantes
const NAME = document.querySelector('#nameCia');
const CIASEARCHBTN = document.querySelector('#searchCiabtn');
const USERFORMUPDATE = document.querySelector('#UserFormUpdate');
const CIAFORMCONTAINER = document.getElementById('ciaFormContainer');

//constantes form creación actualización de cia
const ID = document.querySelector('#id');
const CIANAMEUPDATE = document.querySelector('#ciaNameForm');
const CIACITY = document.querySelector('#ciaCity');
const CIACITYSELECT = document.querySelector('#citySelect');
const COUNTRYSELECT = document.querySelector('#ciaCountry');
const CIAADDRESS = document.querySelector('#ciaDirInput');
const CIAEMAIL = document.querySelector('#emailCiaInput');
const CIAPHONE = document.querySelector('#ciaPhone');
const ciaTable = document.querySelector('#testCompany');
const CIAADDBTN = document.querySelector('#createCiabtn');
const CANCELCIABTN = document.querySelector('#cancelCiarbtn');
const CIAFORM = document.querySelector('#createCiaForm');
//url fetch
const urlCIA = rutas.urlCIA
const urlALLCITY = rutas.urlALLCITY
const urlCOUNRTY = rutas.urlCOUNRTY
const urlCITYBYCOUNTRY = rutas.urlCITYBYCOUNTRY
/* 
const urlCIA = process.env.urlCIA
const urlALLCITY = process.env.urlALLCITY
const urlCOUNRTY = process.env.urlCOUNRTY
const urlCITYBYCOUNTRY = process.env.urlCITYBYCOUNTRY */
/**
 * Agrega una cía.
 */
const addCia = () => {
    //
    event.preventDefault()
    const data = {
        //id: ID.value,
        name: CIANAMEUPDATE.value,
        city_id: CIACITYSELECT.value,
        address: CIAADDRESS.value,
        email: CIAEMAIL.value,
        phone: CIAPHONE.value
    }
    fetchdata(urlCIA, 'POST', data)
        .then((res) => {
            alert(res.Mensaje)
            //console.log(res)
            console.log("ciacityselect ", CIACITYSELECT.value)
            CIAFORM.reset();
            //window.location.href = '../pages/companieslist.html';
        })
        .catch((err) => {
            console.log("err create CIA", err)
        })
}

//Consulta el listado de city
const forPopUp = (url, search = "", where) => {
    const array = []
    getdata(url, 'GET', search)
        .then((res) => {
            //Sirve para cuando el pais no tiene ciudades cargas
            if (res.query == null) {
                let element = "";
                element += "<option selected>País sin ciudades cargadas</option>"
                where.innerHTML = element
            } else {
                console.log('RES ', res)
                let element = "";
                for (let i = 0; i < res.query.length; i++) {
                    array.push(res.query[i]);

                }
                for (let e = 0; e < array.length; e++) {
                    element += markUpAny(
                        array[e].id,
                        array[e].name
                    );

                }
                element += "<option selected>Selecionar</option>"
                where.innerHTML = element

            }
        })
        .catch((err) => {
            console.log('err ', err)
        })
}

const forPopUpBACKUP = (url, search = "", where) => {
    const array = []
    getdata(url, 'GET', search)
        .then((res) => {
            console.log('RES ', res.query)
            let element = "";
            for (let i = 0; i < res.query.length; i++) {
                array.push(res.query[i]);

            }
            for (let e = 0; e < array.length; e++) {
                element += markUpAny(
                    array[e].id,
                    array[e].name
                );

            }
            element += "<option selected>Selecionar</option>"
            where.innerHTML = element
        })
        .catch((err) => {
            console.log('err ', err)
        })
}
//DIBUJAR EL HTML DE CITY/country  
const markUpAny = (ID, Name) => {
    return `
    
    <option value="${ID}">${Name}</option>

    `
}

//Para el popup de cities
function popUpCity() {
    const countryID = COUNTRYSELECT.value
    forPopUp(urlCITYBYCOUNTRY, countryID, CIACITYSELECT)
}

//Para el popup de countries
forPopUp(urlCOUNRTY, "", COUNTRYSELECT)

//listener
CIAADDBTN.addEventListener('click', addCia)
COUNTRYSELECT.addEventListener('change', popUpCity)