import { fetchdata, getdata, getdata2, deldata } from '../routes/fetchdata.js';
import { rutas } from '../scripts/rutas.js';


//constantes
const SEARCHCONTACTVALUE = document.querySelector('#searchContact');
const SEARCHBTN = document.querySelector('#searchContactBTN');
const CONTACTTABLE = document.querySelector('#contactTable');
const CHECKAll = document.querySelector('#checkAll');
const checkSelected = document.querySelector('#checkSelected');
const TRASHCONTAINER = document.querySelector('#trashContainer')
const ADDCONTACTBTN = document.querySelector('#addContactBTN');
//constantes order by
const CONTACTARROW = document.querySelector('#contactArrow');
const REGIONARRROW = document.querySelector('#regionArrow');
const CIAARROW = document.querySelector('#ciaArrow');
const JOBARROW = document.querySelector('#jobArrow');
const INTERESARROW = document.querySelector('#interestArrow');



//constantes formulario de actualicion de contacto
const contactID = document.querySelector('#contactID');
const contactNameForm = document.querySelector('#contactNameForm');
const conctactLastNameForm = document.querySelector('#conctactLastNameForm');
const jobTitleForm = document.querySelector('#jobTitleForm');
const emailContact = document.querySelector('#emailContact');
const ciaContact = document.querySelector('#ciaContact');
const cityContactSelect = document.querySelector('#cityContactSelect');
const contactDirInput = document.querySelector('#contactDirInput');
const interestContact = document.querySelector('#interestContact');
const createContactForm = document.querySelector('#createContactForm');
const Contactupdate = document.querySelector('#Contactupdate');
const regionContactSelect = document.querySelector('#regionContactSelect');
const paisContactSelect = document.querySelector('#paisContactSelect');
const phone = document.querySelector('#phone');
const phonePref = document.querySelector('#phonePref');
const email = document.querySelector('#email');
const emailPref = document.querySelector('#emailPref');
const whatsapp = document.querySelector('#whatsapp');
const whatsappPref = document.querySelector('#whatsappPref');
const facebook = document.querySelector('#facebook');
const facebookPref = document.querySelector('#facebookPref');
const twitter = document.querySelector('#twitter');
const twitterPref = document.querySelector('#twitterPref');


const CANCELCONTACTBTN = document.querySelector('#cancelContactbtn');
const updateContactbtn = document.querySelector('#updateContactbtn');
const CONTACTFORMCONTAINER = document.querySelector('#contactFormContainer');

//urlfetch
const urlCONTACT = rutas.urlCONTACT;
const urlALLCONTACT = rutas.urlALLCONTACT;
const urlCONTACTGEO = rutas.urlCONTACTGEO;
const urlCONTACTCIA = rutas.urlCONTACTCIA;
const urlALLCONTACTINFO = rutas.urlALLCONTACTINFO;
const urlALLCITY = rutas.urlALLCITY;
const urlAllCia = rutas.urlAllCia;
const urlALLRegion = rutas.urlALLRegion;
const urlCOUNRTY = rutas.urlCOUNRTY;
const urlcontactChannelByContact = rutas.urlcontactChannelByContact;



let status = true;
/**
 * Ordena en forma ascendente o descente un array.  
 * _.OrderBy es una funcion de lodash
 * @param {array} Array
 * @param {string} Criterio de ordenamiento
 * @returns 
 */
function sortBy(arr, key) {
    status = !status
    if (!!status) {
        //console.log("Status => ", status)
        return _.orderBy(arr, key, "asc")

    } else {
        //console.log("STATUS => ", status)
        return _.orderBy(arr, key, "desc")

    }
}

/**
 * Buscar un contacto o varios según criterio. Trae todos los datos del contacto ARRAY de objetos.
 * @param {} url 
 * @param {GET} method 
 * @param {name.value} search 
 * @param {country.name} key 
 * 
 */
const searchContact = (url, method, search = "", key) => {
    //
    getdata(url, method, search, key)
        .then((res) => {
            let array = []
            //const {data} = res;
            //console.log("res getdata search", res)
            for (let i = 0; i < res.query.length; i++) {
                array.push(res.query[i]);
            }
            array = sortBy(array, key)
            return array
        })
        .then(function (array) {
            let element = "";
            for (let e = 0; e < array.length; e++) {
                element += markUpSearch(
                    e,
                    array[e].first_name,
                    array[e].last_name,
                    array[e].email,
                    array[e]["city.country.name"],
                    array[e]["city.country.region.name"],
                    array[e]["company.name"],
                    array[e].job_title,
                    array[e].interest,
                    array[e].id,
                );
            }

            CONTACTTABLE.innerHTML = element;
            //console.log(s);

            return array
        })

        //agrego comportamientos para borrar y actualizar Contacto
        //agrego comportamiento para seleccionar todos los elementos
        .then(function (array) {
            for (let i = 0; i < array.length; i++) {
                const delContactBTN = document.getElementById(`del-${array[i].id}`);
                const updateContactBTN = document.getElementById(`act-${array[i].id}`);
                const selectContactBTN = document.getElementById(`check-${array[i].id}`);

                //Seleccionar input[type="checkbox"]
                selectContactBTN.addEventListener('click', function () {
                    //console.log("array ", array)
                    //console.log(`check-${array[i].id}`),
                    toggleOne(`check-${array[i].id}`)


                })

                //Borrar
                delContactBTN.addEventListener('click', function () { delContact(urlCONTACT, array[i].id, array[i].first_name) });
                //Actualizar
                updateContactBTN.addEventListener('click',
                    function () {
                        //alert(array[i].city_id)
                        CONTACTFORMCONTAINER.style.display = "flex";
                        setValueContact(
                            array[i].id,
                            array[i].first_name,
                            array[i].last_name,
                            array[i].job_title,
                            array[i].email,
                            //array[i]["company.id"],
                            //array[i].city_id,
                            array[i].address,
                            //array[i].interest,

                        );
                        //establece los valores del popup (select).
                        $("#interestContact").val(array[i].interest);
                        $("#ciaContact").val(array[i].company_id);
                        $("#regionContactSelect").val(array[i]["city.country.regions_id"]);
                        $("#paisContactSelect").val(array[i]["city.country.id"]);
                        $("#cityContactSelect").val(array[i].city_id)
                        //establece los valores de las preferencias de contacto/channels
                        contactChannels(array[i].id, 1, phone, phonePref);
                        contactChannels(array[i].id, 2, email, emailPref);
                        contactChannels(array[i].id, 3, whatsapp, whatsappPref);
                        contactChannels(array[i].id, 4, facebook, facebookPref);
                        contactChannels(array[i].id, 5, twitter, twitterPref);

                    });
                //contactChannels(urlcontactChannelByContact, 'GET', array[i].id, 1)
            }
            return array
        })

        .catch((err) => {
            console.log('error searchContact => ', err)
        })
}

//establece el valor de contact&channels
const contactChannels = (id, channel, where, wherePref) => {
    //
    getdata(urlcontactChannelByContact, 'GET', `${id}/${channel}`)
        .then((res) => {
            console.log("res 2 ", res)
            for (let e = 0; e < res.query.length; e++) {
                console.log("res.query[e].account ", res.query[e].account)
                where.setAttribute('value', res.query[e].account)
                $(wherePref).val(res.query[e].preference)

            }

        })
        .catch((err) => {
            console.log('error contactChannels => ', err)
        })

}

/**
 * Actualiza un contacto y sus preferencias de contacto/channels
 */
const updateContact = () => {
    //
    event.preventDefault()
    const data = {
        id: contactID.value,
        first_name: contactNameForm.value,
        last_name: conctactLastNameForm.value,
        job_title: jobTitleForm.value,
        email: emailContact.value,
        company_id: ciaContact.value,
        city_id: cityContactSelect.value,
        address: contactDirInput.value,
        interest: interestContact.value,
    }
    fetchdata(urlCONTACT, 'PUT', data)
        .then((res) => {
            console.log("data update contact ", data)
            //Contactupdate.reset();
        })
        .catch((err) => {
            console.log("err update contact".err)
        })
}
/**
 * Markup. Dibuja el HTML de contacto
 */
const markUpSearch = (order, first_name, last_name, email, country, region, company, job_title, interest, id) => {
    return `
    <tr class="td">
    <td><input type="checkbox" id="check-${id}" name="${id}"></td>
    <td>${first_name} ${last_name}<div class="insideText" >${email}</div></td>
    <td>${country} <div class="insideText" >${region}</div></td>
    <td>${company}</td>
    <td>${job_title}</td>
    <td>${interest}</td>
    <td id="act-${id}"><button class="btn btn-primary me-md-2" type="button">Actualizar</button></td>
    <td id="del-${id}"><button class="btn btn-primary me-md-2" type="button">Borrar</button></td>
    </tr>
    `
}
//borrar contacto
const delContact = (url, id, name) => {
    const data = { ids: id }
    let confirmDialog = confirm(`¿Esta seguro que desea borrar => ${name}?`);
    if (confirmDialog) {
        fetchdata(url, 'DELETE', data)
            .then((res) => {
                console.log('res ', res)
                searchContact(urlCONTACT, 'GET', `?name=`, "first_name")
            })
            .catch((error) => {
                console.log('error', error)
            })
    } else {
        console.log("eliminación cancelada")
    }
}



CHECKAll.checked = false;
let arrayTR = [];
let check = true;
/**
 *  Selecciona/Des Selecciona todas las checkboxes. Guarda todos los registros en un array
 * 
 */
function toggle() {
    check = !check
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    if (!!check) {
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].type == 'checkbox')
                checkboxes[i].checked = false;
        }
        arrayTR = []
        //TODO cambiar el inner y sacar "seleccionados"
        checkSelected.innerHTML = MarkupCheckBoxes(arrayTR.length)
    }
    else {
        for (let i = 0; i < checkboxes.length; i++) {
            if (checkboxes[i].type == 'checkbox')
                checkboxes[i].checked = true;
            arrayTR.push(checkboxes[i].name)
        }
        //quito el checkboxALL
        arrayTR.shift()
        checkSelected.innerHTML = MarkupCheckBoxes(arrayTR.length)
    }


}
//One check
function toggleOne(item) {
    //check = !check
    const object = document.getElementById(`${item}`)
    if (object.checked == true) {
        object.checked = true
        arrayTR.push(object.name)
        checkSelected.innerHTML = MarkupCheckBoxes(arrayTR.length)
    } else {
        object.checked = false
        _.pull(arrayTR, object.name)
        checkSelected.innerHTML = MarkupCheckBoxes(arrayTR.length)
    }
    //console.log(object)
}
//Eliminar seleccionados
function deleteSelection(url, ids) {
    //
    const data = { ids: ids }
    let confirmDialog = confirm(`¿Esta seguro que desea borrar los contactos seleccionados?`);
    if (confirmDialog) {
        fetchdata(url, 'DELETE', data)
            .then((res) => {
                console.log('res ', res)
                searchContact(urlCONTACT, 'GET', `?name=`, "first_name")
            })
            .catch((error) => {
                console.log('error', error)
            })
    } else {
        console.log("eliminación masiva cancelada")
    }
}

/**
 * Setea los valores del boton UPDATE para levantar el form de actualización
 */
const setValueContact = (id, name, last_name, job, email, address) => {
    //const listToUpdate = JSON.parse(sessionStorage.getItem("ciaList"));
    //console.log("listToUpdate  ", listToUpdate[order]);

    //carga el valor en cada campo
    contactID.setAttribute('value', id)
    contactNameForm.setAttribute('value', name)
    conctactLastNameForm.setAttribute('value', last_name)
    jobTitleForm.setAttribute('value', job)
    emailContact.setAttribute('value', email)
    //Cia y City lo setea en la resolución de la Promise
    //ciaContact.setAttribute('value', cia)
    //cityContactSelect.setAttribute('value', city)
    contactDirInput.setAttribute('value', address)
    //interestContact.setAttribute('value', interest)

};
/**
 * Actualizar Contacto
 */

/**
 * Cierra el modal sin guardar los cambios
 */
const cancelBTN = () => {
    CONTACTFORMCONTAINER.style.display = "none";
}
/**
 *  Markup checkboxes seleccionadas
 */
const MarkupCheckBoxes = (length) => {
    return `
    <p class="checkAction">${length} Seleccionados</p>
    `
}
/**
 * Redirige crear Contacto
 */
function newContact() {
    window.location.href = '../pages/newcontact.html'
}
//consulta para el popup de City
const forPopUpCity = (url, search = "", where) => {
    const array = []
    getdata(url, 'GET', search)
        .then((res) => {
            //Sirve para cuando el pais no tiene ciudades cargas

            let element = "";
            for (let i = 0; i < res.query.length; i++) {
                array.push(res.query[i]);

            }
            //array.unshift({ id: 9999999, regions_id: 9999999, name: "-- Selecionar --" })
            //console.log("array ", array)
            for (let e = 0; e < array.length; e++) {
                element += markUpAny(
                    array[e].id,
                    array[e].name
                );
            }
            where.innerHTML = element

        })
        .catch((err) => {
            console.log('err ', err)
        })
}
//DIBUJAR EL HTML DE CITY/country/CIA  
const markUpAny = (ID, Name) => {
    return `
    
    <option value="${ID}">${Name}</option>

    `
}

//onload
searchContact(urlCONTACT, 'GET', `?name=`, "first_name");

//Dibujo en el HTML:
//companias
forPopUpCity(urlAllCia, ``, ciaContact);
//regiones
forPopUpCity(urlALLRegion, ``, regionContactSelect);
//country
forPopUpCity(urlCOUNRTY, ``, paisContactSelect);
//ciudades
forPopUpCity(urlALLCITY, ``, cityContactSelect);

//listenners
CHECKAll.addEventListener('click', toggle)
SEARCHBTN.addEventListener('click', () => searchContact(urlCONTACT, 'GET', `?name=${SEARCHCONTACTVALUE.value}`, "first_name"))
CONTACTARROW.addEventListener('click', () => searchContact(urlCONTACT, 'GET', `?name=${SEARCHCONTACTVALUE.value}`, "first_name"));
REGIONARRROW.addEventListener('click', () => searchContact(urlCONTACT, 'GET', `?name=${SEARCHCONTACTVALUE.value}`, "city.country.name"));
CIAARROW.addEventListener('click', () => searchContact(urlCONTACT, 'GET', `?name=${SEARCHCONTACTVALUE.value}`, "", "company.name"));
JOBARROW.addEventListener('click', () => searchContact(urlCONTACT, 'GET', `?name=${SEARCHCONTACTVALUE.value}`, "job_title"));
INTERESARROW.addEventListener('click', () => searchContact(urlCONTACT, 'GET', `?name=${SEARCHCONTACTVALUE.value}`, "interest"));
ADDCONTACTBTN.addEventListener('click', newContact)
TRASHCONTAINER.addEventListener('click', () => { deleteSelection(urlCONTACT, arrayTR) })
CANCELCONTACTBTN.addEventListener('click', cancelBTN)
updateContactbtn.addEventListener('click', updateContact)
