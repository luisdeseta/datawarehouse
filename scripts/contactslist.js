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



//constantes formulario de actuliacion de contacto


//urlfetch
const urlCONTACT = rutas.urlCONTACT;
const urlALLCONTACT = rutas.urlALLCONTACT;
const urlCONTACTGEO = rutas.urlCONTACTGEO;
const urlCONTACTCIA = rutas.urlCONTACTCIA;
const urlALLCONTACTINFO = rutas.urlALLCONTACTINFO;




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
        /*         .then(function (array) {
                    array = sortBy(array, key)
                    //_.orderBy(array, "first_name", "desc")
                    //array.sort(sortBy(key))
                    console.log("array => ", array)
                    return array
                }) */
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
                    console.log(`check-${array[i].id}`),
                        toggleOne(`check-${array[i].id}`)
                })

                //Borrar
                delContactBTN.addEventListener('click', function () { delContact(urlCONTACT, array[i].id, array[i].first_name) });
                //Actualizar
                updateContactBTN.addEventListener('click',
                    function () {
                        //alert(array[i].city_id)
                        //CIAFORMCONTAINER.style.display = "flex";
                        setValueContact(
                            i,
                            array[i].first_name,
                            array[i].last_name,
                            array[i].email,
                            array[i]["city.country.name"],
                            array[i]["company.name"],
                            array[i].job_title,
                            array[i].interest,
                            array[i].id,
                        );
                    });
                //Establecer valor de la base de datos para el dropdown de interes. Solo en el form de editar contacto
                //https://www.geeksforgeeks.org/how-to-set-the-value-of-a-select-box-element-using-javascript/
            }
        })


        .catch((err) => {
            console.log('error searchContact => ', err)
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
//actualizar contacto
const setValueContact = (a, b, c, d, e, f, g, h, i) => {

    //carga el valor en cada campo

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

//onload
searchContact(urlCONTACT, 'GET', `?name=`, "first_name")

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
