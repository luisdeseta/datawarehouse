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
//constantes creacion de channelsContacts
const phone = document.querySelector('#phone');
const email = document.querySelector('#email');
const whatsapp = document.querySelector('#whatsapp');
const facebook = document.querySelector('#facebook');
const twitter = document.querySelector('#twitter');
const phonePref = document.querySelector('#phonePref');
const emailPref = document.querySelector('#emailPref');
const whatsappPref = document.querySelector('#whatsappPref');
const facebookPref = document.querySelector('#facebookPref');
const twitterPref = document.querySelector('#twitterPref');

//url fetch
const urlAllCia = rutas.urlAllCia
const urlALLCITY = rutas.urlALLCITY
const urlCOUNRTY = rutas.urlCOUNRTY
const urlCITYBYCOUNTRY = rutas.urlCITYBYCOUNTRY
const urlALLRegion = rutas.urlALLRegion
const url1CountryByRegion = rutas.url1CountryByRegion
const urlCONTACT = rutas.urlCONTACT
const urlcontactChannelsBulk = rutas.urlcontactChannelsBulk

/**
 * Agrega un contacto
 * @param {*} params 
 */
function addContact() {
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
            //createContactForm.reset();
            newContactID = res.newContact
        })
        .then((res) => {
            //agrego los canales para el contacto
            addContactChannel()
        })
        .catch((err) => {
            console.log("err create contact", err)
        })
}

let newContactID = false
/**
 * Agregar Canales a un contacto
 */
function addContactChannel() {
    //
    console.log("newContactID ", newContactID)
    const data = [
        {
            contacts_id: newContactID,
            channels_id: 1, //Telefono
            account: phone.value,
            preference: phonePref.value
        },
        {
            contacts_id: newContactID,
            channels_id: 2, //email
            account: email.value,
            preference: emailPref.value
        },
        {
            contacts_id: newContactID,
            channels_id: 3, //whatsapp
            account: whatsapp.value,
            preference: whatsappPref.value
        },
        {
            contacts_id: newContactID,
            channels_id: 4, //facebook
            account: facebook.value,
            preference: facebookPref.value
        },
        {
            contacts_id: newContactID,
            channels_id: 5, //twitter
            account: twitter.value,
            preference: twitterPref.value
        }
    ]

    fetchdata(urlcontactChannelsBulk, 'POST', data)
        .then((res) => {
            console.log(res);
        })
        .catch((err) => {
            console.log("err contact channerls ", err)
        })

}

/**
 * Consulta una tabla para traer los datos del SELECT
 * @param {*} url Endpoint para obtener los datos de la tabla
 * @param {*} search Criterio de busqueda. Opcional
 * @param {*} where Lugar donde se dibujaran los datos
 */
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
                array.unshift({ id: 9999999, regions_id: 9999999, name: "-- Selecionar --" })
                for (let e = 0; e < array.length; e++) {
                    element += markUpAny(
                        array[e].id,
                        array[e].name
                    );

                }
                //element += "<option selected>Selecionar</option>"
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
createContactbtn.addEventListener('click', () => { addContact() })
regionContactSelect.addEventListener('change', popUpCountry)
paisContactSelect.addEventListener('change', popUpCity)