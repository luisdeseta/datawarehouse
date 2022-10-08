import { fetchdata, getdata, deldata } from '../routes/fetchdata.js';
import { rutas } from '../scripts/rutas.js'

//constantes
const regionContactSelect = document.querySelector('#regionContactSelect');
const paisContactSelect = document.querySelector('#paisContactSelect');
const cityContactSelect = document.querySelector('#cityContactSelect');
const createContactbtn = document.querySelector('#createContactbtn')
const ciaContact = document.querySelector('#ciaContact');
//constantes creacion de contacto
const contactNameForm = document.querySelector('#contactNameForm');
const conctactLastNameForm = document.querySelector('#conctactLastNameForm');
const jobTitleForm = document.querySelector('#jobTitleForm');
const emailContact = document.querySelector('#emailContact');
const contactDirInput = document.querySelector('#contactDirInput');
const interestContact = document.querySelector('#interestContact');
const createContactForm = document.querySelector('#createContactForm');

//url fetch
const urlAllCia = rutas.urlAllCia
const urlALLCITY = rutas.urlALLCITY
const urlCOUNRTY = rutas.urlCOUNRTY
const urlCITYBYCOUNTRY = rutas.urlCITYBYCOUNTRY
const urlALLRegion = rutas.urlALLRegion
const url1CountryByRegion = rutas.url1CountryByRegion
const urlCONTACT = rutas.urlCONTACT

/**
 * Agrega un contacto
 * @param {*} params 
 */
function addContact(params) {
    event.preventDefault()
    const data = {
        first_name: contactNameForm.value,
        last_name: conctactLastNameForm.value,
        job_title: jobTitleForm.value,
        email: emailContact.value,
        company_id: ciaContact.value,
        city_id: cityContactSelect.value,
        address: contactDirInput.value,
        interest: interestContact.value
    }
    fetchdata(urlCONTACT, 'POST', data)
        .then((res) => {
            alert(res.Mensaje)
            console.log(res);
            createContactForm.reset();
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
                element += "<option selected>Seleccionar</option>"
                where.innerHTML = element
            } else {
                //console.log('RES ', res)
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

//DIBUJAR EL HTML DE CITY/country  
const markUpAny = (ID, Name) => {
    return `
    
    <option value="${ID}">${Name}</option>

    `
}

//Popup para cia
forPopUp(urlAllCia, "", ciaContact)


//Popup Region
forPopUp(urlALLRegion, "", regionContactSelect)
//PopUp Pais
function popUpCountry() {
    const regionID = regionContactSelect.value
    forPopUp(url1CountryByRegion, regionID, paisContactSelect)
}
//PopUp City
function popUpCity() {
    const countryID = paisContactSelect.value
    forPopUp(urlCITYBYCOUNTRY, `?country=${countryID}`, cityContactSelect)
}

//Listenner
createContactbtn.addEventListener('click', addContact)
regionContactSelect.addEventListener('change', popUpCountry)
paisContactSelect.addEventListener('change', popUpCity)