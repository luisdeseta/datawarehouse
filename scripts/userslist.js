import { fetchdata, getdata, deldata } from '../routes/fetchdata.js';


//Constantes
const NAME = document.querySelector('#name');
const USERSEARCHBTN = document.querySelector('#searchUserbtn');
const USERFORMUPDATE = document.querySelector('#UserFormUpdate');
const FORMCONTAINER = document.getElementById('formContainer');
const NEWUSERBTN = document.querySelector('#newUserbtn');
//Constantes form update de usuario
const ID = document.querySelector('#id');
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

    //const search = { email: NAME.value, }
    const array = []
    getdata(url, 'GET', search)
        .then((res) => {
            console.log("res users ", res)
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
            //console.log("array => ", array)
        })

        //agrego comportamientos para borrar y actualizar usuarios
        .then(() => {
            for (let i = 0; i < array.length; i++) {
                const delUserBTN = document.getElementById(`del-${array[i].id}`, `${array[i].first_name} - `, `${array[i].last_name}`);
                const updateBTN = document.getElementById(`act-${array[i].id}`);

                delUserBTN.addEventListener('click', function () { delUser(array[i].id, array[i].first_name, array[i].last_name) });
                updateBTN.addEventListener('click',
                    function () {
                        //alert(array[i].first_name)
                        FORMCONTAINER.style.display = "flex";
                        setValueUser(
                            i,
                            array[i].id,
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

//Markup para dibujar la tabla de usuarios
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
 * 
 */
const delUser = (userID, name, last_name) => {

    let confirmDialog = confirm(`¿Esta seguro que desea borrar => ${name} ${last_name}?`);
    if (confirmDialog) {
        deldata(urlUSER, 'DELETE', userID)
            .then((res) => {
                console.log('res ', res)
                searchUser(urlALL);
            })
            .catch((err) => {
                console.log('error ', err)
            })

    } else {
        console.log("eliminación cancelada")
    }

}

/**
 * Setea los valores del boton UPDATE para levantar el form de actualización
 */
const setValueUser = (order, id, name, last, email, profile) => {
    const listToUpdate = JSON.parse(sessionStorage.getItem("userList"));
    //console.log("listToUpdate  ", listToUpdate[order]);

    //carga el valor en cada campo
    ID.setAttribute('value', id)
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
        id: ID.value,
        first_name: NAMEUPDATE.value,
        last_name: LASTNAME.value,
        email: EMAIL.value,
        password: PASS.value,
        profile: PROFILE.value
    }
    fetchdata(urlUSER, 'PUT', data)
        .then((res) => {
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
 * Cierra el modal sin guardar los cambios
 */
const cancelBTN = () => {
    //alert("boton cerrar");
    FORMCONTAINER.style.display = "none";
}
/**
 * Dirige a Formulario de creación de Usuario
 */

const formNewUser = () => {
    window.location.href = '../pages/user.html'
}
/**
 * Ejecuta la busqueda desde el campo de busqueda al presionar Enter
 * @param {tecla enter} z 
 */
const doSearch = (z) => {
    if (z.keyCode === 13) {
        searchUser(urlUSER, NAME.value)
    }

}

//ejecuto la busqueda para cargar los usuarios de la base de datos
searchUser(urlALL);
//LISTENERS
USERSEARCHBTN.addEventListener('click', () => searchUser(urlUSER, NAME.value));
NAME.addEventListener('keypress', doSearch);
UPDATEBT.addEventListener('click', updateUser);
//UPDATEBT.addEventListener('keypress', (z) => { if (z.keyCode === 13) return updateUser });
CANCELBTN.addEventListener('click', cancelBTN);
NEWUSERBTN.addEventListener('click', formNewUser)