import { fetchdata, getdata, deldata } from '../routes/fetchdata.js';
import { rutas } from '../scripts/rutas.js';

//constantes
const NAME = document.querySelector('#nameCia');
const CIASEARCHBTN = document.querySelector('#searchCiabtn');
const USERFORMUPDATE = document.querySelector('#UserFormUpdate');
const CIAFORMCONTAINER = document.getElementById('ciaFormContainer');
const NEWCIABTN = document.querySelector('#newCiabtn');

//constantes form creación actualización de cia
const ID = document.querySelector('#id');
const CIANAMEUPDATE = document.querySelector('#ciaNameForm');
const CIACITY = document.querySelector('#ciaCity');
const CIAADDRESS = document.querySelector('#ciaDirInput');
const CIAEMAIL = document.querySelector('#emailCiaInput');
const CIAPHONE = document.querySelector('#ciaPhone');
const ciaTable = document.querySelector('#testCompany');
const UPDATECIABT = document.querySelector('#updateCiabtn');
const CANCELCIABTN = document.querySelector('#cancelCiarbtn');
const CIAFORM = document.querySelector('#theCiaForm')
const ciaCountry = document.querySelector('#ciaCountry');
//url fetch
const urlCIA = rutas.urlCIA
const urlAllCia = rutas.urlAllCia
const urlALLCITY = rutas.urlALLCITY
const urlAllDataCia = rutas.urlAllDataCia
const urlCOUNRTY = rutas.urlCOUNRTY
const urlCITYBYCOUNTRY = rutas.urlCITYBYCOUNTRY

//Buscar cía
const searchCia = (url, search = "") => {
    //
    const array = []
    getdata(url, 'GET', search)
        .then((res) => {
            //const {data} = res;
            console.log("res getdata searchCia", res.query)
            let element = "";
            for (let i = 0; i < res.query.length; i++) {
                array.push(res.query[i]);
            }
            for (let e = 0; e < array.length; e++) {
                element += markUpSearch(
                    e,
                    array[e].id,
                    array[e].name,
                    array[e].city.name,
                    array[e].address,
                    array[e].email,
                    array[e].phone);
            }

            ciaTable.innerHTML = element;
            sessionStorage.setItem("Cia ", JSON.stringify(array));
            //console.log("res cia => ", res)
            //console.log("array cia => ", array)
        })

        //agrego comportamientos para borrar y actualizar Cia
        .then(() => {
            for (let i = 0; i < array.length; i++) {
                const delCiaBTN = document.getElementById(`del-${array[i].id}`, `${array[i].name}`);
                const updateCiaBTN = document.getElementById(`act-${array[i].id}`);

                delCiaBTN.addEventListener('click', function () { delCia(array[i].id, array[i].name) });
                updateCiaBTN.addEventListener('click',
                    function () {
                        //alert(array[i].city_id)
                        CIAFORMCONTAINER.style.display = "flex";
                        setValueCia(
                            i,
                            array[i].id,
                            array[i].name,
                            array[i].city.name,
                            array[i].address,
                            array[i].email,
                            array[i].phone,
                        );
                        //forPopUpCity(urlALLCITY, ``, CIACITY)
                        $("#ciaCountry").val(array[i].city.country_id)
                        $("#ciaCity").val(array[i].city.id)
                    });
            }
            console.log('array ', array)
        })


        .catch((err) => {
            console.log('error searchCia => ', err)
        })

}

//Markup para dibujar la tabla de cias
const markUpSearch = (order, id, name, city, address, email, phone) => {
    return `
            <tr>
            <td>${order}</td>
            <td>${id}</td>
            <td>${name}</td>
            <td>${city}</td>
            <td>${address}</td>
            <td>${email}</td>
            <td>${phone}</td>
            <td id="act-${id}"><button class="btn btn-primary me-md-2" type="button">Actualizar</button></td>
            <td id="del-${id}"><button class="btn btn-primary me-md-2" type="button">Borrar</button></td>
            </tr>
            `
}

/**
 * Borrar Cia
 * 
 */
const delCia = (ciaID, name) => {

    let confirmDialog = confirm(`¿Esta seguro que desea borrar => ${name}?`);
    if (confirmDialog) {
        deldata(urlCIA, 'DELETE', ciaID)
            .then((res) => {
                console.log('res ', res)
                searchCia(urlAllCia);
            })
            .catch((err) => {
                console.log('error del cia ', err)
            })

    } else {
        console.log("eliminación cancelada")
    }

}

/**
 * Setea los valores del boton UPDATE para levantar el form de actualización
 */
const setValueCia = (order, id, name, city, address, email, phone) => {
    const listToUpdate = JSON.parse(sessionStorage.getItem("ciaList"));
    //console.log("listToUpdate  ", listToUpdate[order]);

    //carga el valor en cada campo
    ID.setAttribute('value', id)
    CIANAMEUPDATE.setAttribute('value', name);
    CIACITY.setAttribute('value', city.name);
    CIAADDRESS.setAttribute('value', address);
    CIAEMAIL.setAttribute('value', email);
    CIAPHONE.setAttribute('value', phone)

};



/**
 * Actualizar compañía
 * Levanta el value de la cia y hace put
 */
const updateCia = () => {
    event.preventDefault()
    const data = {
        id: ID.value,
        name: CIANAMEUPDATE.value,
        city_id: CIACITY.value,
        address: CIAADDRESS.value,
        email: CIAEMAIL.value,
        phone: CIAPHONE.value
    }
    fetchdata(urlCIA, 'PUT', data)
        .then((res) => {
            console.log("data updateCia ", data)
            //reseteo los valores del form
            CIAFORM.reset();
        })
        .then((res) => {
            //ejecuto la busqueda para mostrar la lista nuevamente
            searchCia(urlAllDataCia);
            CIAFORMCONTAINER.style.display = "none";

        })
        .catch((err) => {
            console.log("err UPDATE CIA", err)
        })
}


/**
 * Cierra el modal sin guardar los cambios
 */
const cancelBTN = () => {
    //alert("boton cerrar");
    CIAFORMCONTAINER.style.display = "none";
}
/**
 * Dirige a Formulario de creación de Cia
 */

const formNewCia = () => {
    window.location.href = '../pages/company.html'
}
/**
 * Ejecuta la busqueda desde el campo de busqueda al presionar Enter
 * @param {tecla enter} z 
 */
const doSearchCia = (z) => {
    if (z.keyCode === 13) {
        searchCia(urlCIA, NAME.value)
    }

}

//Consulta el listado de country
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
                //console.log('RES ', res)
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

            }
        })
        .catch((err) => {
            console.log('err ', err)
        })
}

//consulta para el popup de City
const forPopUpCity = (url, search = "", where) => {
    const array = []
    getdata(url, 'GET', search)
        .then((res) => {
            //Sirve para cuando el pais no tiene ciudades cargas
            /* if (res.query == null) {
                let element = "";
                element += "<option selected>País sin ciudades cargadas</option>"
                where.innerHTML = element
            } else {
                //console.log('RES ', res)
            
            
            } */

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

//DIBUJAR EL HTML DE CITY/country  
const markUpAny = (ID, Name) => {
    return `
    
    <option value="${ID}">${Name}</option>

    `
}
//DIBUJAR EL HTML DE CITY seleccionada. Sirve para hacer update de la cía 
const markUpCity = (ID, Name) => {
    return `
    
    <option value="${ID}">Seleccione pais para cambiar</option>

    `
}

//ejecuto el popup de country
forPopUp(urlCOUNRTY, "", ciaCountry)
forPopUpCity(urlALLCITY, ``, CIACITY)

//popup de city
function popUpCity() {
    const countryID = ciaCountry.value
    forPopUp(urlCITYBYCOUNTRY, `?country=${ciaCountry.value}`, CIACITY)
}
//ejecuto la busqueda para cargar las cia de la base de datos
searchCia(urlAllDataCia);
//LISTENERS
CIASEARCHBTN.addEventListener('click', () => searchCia(urlCIA, NAME.value))
NAME.addEventListener("keypress", doSearchCia)
UPDATECIABT.addEventListener('click', updateCia);
CANCELCIABTN.addEventListener('click', cancelBTN)
NEWCIABTN.addEventListener('click', formNewCia)
ciaCountry.addEventListener('change', popUpCity)
