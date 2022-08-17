import { fetchdata, getdata, deldata } from '../routes/fetchdata.js';


//Constantes
const NAME = document.querySelector('#name');
const USERSEARCHBTN = document.querySelector('#searchUserbtn');
const USERFORMUPDATE = document.querySelector('#UserFormUpdate');
const FORMCONTAINER = document.getElementById('formContainer');
//Constantes form update de usuario
const NAMEUPDATE = document.querySelector('#nameForm');
const LASTNAME = document.querySelector('#lastName');
const EMAIL = document.querySelector('#emailInput');
const PROFILE = document.querySelector('#profile');
const PASS = document.querySelector('#inputPassword');
const testMark = document.querySelector('#testMark');
const UPDATEBT = document.querySelector('#updateUserbtn');
const CANCELBTN = document.querySelector('#cancelUserbtn');
const FORM = document.querySelector('#theForm')
//URL para fetch
const urlUSER = `http://localhost:3010/api/user/`;
const urlALL = `http://localhost:3010/api/allusers`;

/**
 * busca usuarios 
 */
const searchUser = (url, search = "") => {

    //const search = {        email: NAME.value,    }
    const array = []
    getdata(url, 'GET', search)
        .then((res) => {
            //const {data} = res;
            let element = "";
            for (let i = 0; i < res.users.length; i++) {
                array.push(res.users[i]);
            }
            for (let e = 0; e < array.length; e++) {
                element += markUpSearch(
                    e,
                    array[e].id,
                    array[e].first_name,
                    array[e].last_name,
                    array[e].email,
                    array[e].profile);
            }

            testMark.innerHTML = element;
            //console.log("array to string  2", JSON.stringify(array));
            sessionStorage.setItem("userList", JSON.stringify(array));
            console.log("array => ", array)
        })

        //agrego comportamientos para borrar y actualizar usuarios
        .then(() => {
            for (let i = 0; i < array.length; i++) {
                const delUserBTN = document.getElementById(`del-${array[i].id}`);
                const updateBTN = document.getElementById(`act-${array[i].id}`);

                delUserBTN.addEventListener('click', function () { delUser(array[i].id) });
                updateBTN.addEventListener('click',
                    function () {
                        //alert(array[i].first_name)
                        FORMCONTAINER.style.display = "flex";
                        setValueUser(
                            i,
                            array[i].first_name,
                            array[i].last_name,
                            array[i].email,
                            array[i].profile);
                    });
            }
        })


        .catch((err) => {
            console.log('error =>', err)
        })

}

//TODO formatear el html
const markUpSearch = (order, id, name, last, email, profile) => {
    return `
    <tr>
    <td>${order}</td>
    <td>${id}</td>
    <td>${name}</td>
    <td>${last}</td>
    <td>${email}</td>
    <td>${profile}</td>
    <td id="act-${id}"><button class="btn btn-primary me-md-2" type="button">Actualizar</button></td>
    <td id="del-${id}"><button class="btn btn-primary me-md-2" type="button">Borrar</button></td>
  </tr>
    `
}

/**
 * Borrar usuario
 * TODO AGREGAR CONFIRMACIÓN ANTES DE BORRAR
 */
const delUser = (userID) => {

    deldata(urlUSER, 'DELETE', userID)
        .then((res) => {
            console.log('res ', res)
        })
        .catch((err) => {
            console.log('error ', err)
        })
}

/**
 * Setea los valores del boton UPDATE para levantar el form de actualización
 */
const setValueUser = (order, name, last, email, profile) => {
    const listToUpdate = JSON.parse(sessionStorage.getItem("userList"));
    //console.log("listToUpdate  ", listToUpdate[order]);

    //carga el valor en cada campo
    NAMEUPDATE.setAttribute('value', name);
    LASTNAME.setAttribute('value', last);
    EMAIL.setAttribute('value', email);
    PROFILE.setAttribute('value', profile);

};

/**
 * Actualizar usuario
 * Levanta el value del contacto y hacer put
 */
const updateUser = () => {
    event.preventDefault()
    const data = {
        first_name: NAMEUPDATE.value,
        last_name: LASTNAME.value,
        email: EMAIL.value,
        password: PASS.value,
        profile: PROFILE.value
    }
    fetchdata(urlUSER, 'PUT', data)
        .then((res) => {
            /*             console.log("res update", res);
                        //reseteo los valores del form
                        const value = ''
                        const dataReset = document.querySelectorAll('#nameForm, #lastName, #emailInput, #profile, #inputPassword')
                        console.log("dataReseta ", dataReset)
                        dataReset.forEach(input => {
                            input.setAttribute('value', value);
                        });
                        //borro los datos buscados del sessionStorage
                        sessionStorage.removeItem("userList"); */

            //reseteo los valores del form
            FORM.reset();

        })
        .then((res) => {
            //ejecuto la busqueda para mostrar la lista nuevamente
            searchUser(urlALL);
            FORMCONTAINER.style.display = "none";

        })
        .catch((err) => {
            console.log("err ", err)
        })

}

/**
 * Cierre el modal sin guardar los cambios
 */
const cancelBTN = () => {
    //alert("boton cerrar");
    FORMCONTAINER.style.display = "none";
}
//ejecuto la busqueda para cargar los usuarios de la base de datos
searchUser(urlALL);
//LISTENERS
USERSEARCHBTN.addEventListener('click', () => searchUser(urlUSER, NAME.value));
NAME.addEventListener('keypress', (z) => { if (z.keyCode === 13) return searchUser });
UPDATEBT.addEventListener('click', updateUser);
//UPDATEBT.addEventListener('keypress', (z) => { if (z.keyCode === 13) return updateUser });
CANCELBTN.addEventListener('click', cancelBTN);
