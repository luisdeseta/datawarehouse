import { fetchdata, getdata, deldata } from '../routes/fetchdata.js';
import { rutas } from './rutas.js'

//constantes
const SEARCHCONTACT = document.querySelector('#searchContact');
const SEARCHBTN = document.querySelector('#searchContactBTN');
const CONTACTTABLE = document.querySelector('#contactTable');

//urlfetch
const urlCONTACT = rutas.urlCONTACT;
const urlALLCONTACT = rutas.urlALLCONTACT;
const urlCONTACTGEO = rutas.urlCONTACTGEO;
const urlCONTACTCIA = rutas.urlCONTACTCIA;
const urlALLCONTACTINFO = rutas.urlALLCONTACTINFO;
/**
 * Buscar un contacto o varios según criterio
 * 
 */
const searchContact = (url, search = "") => {
    //
    const array = []
    getdata(url, 'GET', search)
        .then((res) => {
            //const {data} = res;
            //console.log("res getdata search", res)
            let element = "";
            for (let i = 0; i < res.query.length; i++) {
                array.push(res.query[i]);
            }
            for (let e = 0; e < array.length; e++) {
                element += markUpSearch(
                    e,
                    array[e].first_name,
                    array[e].last_name,
                    array[e].email,
                    array[e].city.country.name,
                    array[e].city.country.region.name,
                    array[e].company.name,
                    array[e].job_title,
                    array[e].interest,
                    array[e].id,
                );
            }

            CONTACTTABLE.innerHTML = element;


        })

        //agrego comportamientos para borrar y actualizar Contacto
        .then(() => {
            for (let i = 0; i < array.length; i++) {
                const delContactBTN = document.getElementById(`del-${array[i].id}`);
                const updateContactBTN = document.getElementById(`act-${array[i].id}`);

                delContactBTN.addEventListener('click', function () { delContact(array[i].id, array[i].first_name) });
                updateContactBTN.addEventListener('click',
                    function () {
                        //alert(array[i].city_id)
                        //CIAFORMCONTAINER.style.display = "flex";
                        setValueContact(
                            i,
                            array[i].first_name,
                            array[i].last_name,
                            array[i].email,
                            array[i].city.country.name,
                            array[i].company.name,
                            array[i].job_title,
                            array[i].interest,
                            array[i].id,
                        );
                    });
            }
        })


        .catch((err) => {
            console.log('error searchContact => ', err)
        })
}

/**
 * Markup. Dibuja el HTML de contacto
 * @param {*} order 
 * @param {*} first_name
 * @param {*} last_name 
 * @param {*} email 
 * @param {*} country 
 * @param {*} region 
 * @param {*} company 
 * @param {*} job_title 
 * @param {*} id 
 * @param {*} interest 
 * @param {*} id 
 * @returns 
 */
const markUpSearch = (order, first_name, last_name, email, country, region, company, job_title, interest, id) => {
    return `
    <tr>
    <td>${order}</td>
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
const delContact = (id, name) => {
    alert(id, name)
}
//actualizar contacto
const setValueContact = (a, b, c, d, e, f, g, h, i) => {
    alert((a + b, c, d, e, f, g, h, i))
}

//onload
searchContact(urlALLCONTACTINFO)

//listenners