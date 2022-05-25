import { fetchdata, getdata, deldata } from './fetchdata.js';


//Constantes
const NAME = document.querySelector('#name');
const USERSEARCHBTN = document.querySelector('#searchUserbtn');
const FORM = document.querySelector('#formUserupdate');
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
//URL para fetch
const urlUSER = `http://localhost:3010/api/user/`;
//const urlALL = `http://localhost:3010/api/user/all`;

/**
 * busca usuarios 
 */
const searchUser = () =>{
    //TODO ¿verificar si el usuario es admin?
    const search = {
        email: NAME.value,
        
    }
    console.log(search.email)
    const array =[]
    getdata(urlUSER,'GET', search.email)
        .then((res)=>{
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
            console.log("array 2 => ", array)
            console.log("array to string  2", JSON.stringify(array)  );
            sessionStorage.setItem("userList", JSON.stringify(array)  );
            })
            
        //agrego comportamientos para borrar y actualizar usuarios
        .then(()=>{
            for (let i = 0; i < array.length; i++) {
                const delUserBTN = document.getElementById(`del-${array[i].id}`);
                const updateUserBTN = document.getElementById(`act-${array[i].id}`);
                
                delUserBTN.addEventListener('click', function () {delUser(array[i].id) } );
                updateUserBTN.addEventListener('click', 
                        function () {
                            //alert(array[i].first_name)
                            FORMCONTAINER.style.diplay="flex",
                            console.log(FORMCONTAINER)
                       /*      ,setValueUser(
                            i,
                            array[i].first_name,
                            array[i].last_name, 
                            array[i].email, 
                            array[i].profile );  */
                        });
                    }
            })
        

        .catch((err)=>{
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
    <td id="act-${id}">Act</td>
    <td id="del-${id}">Del</td>
  </tr>
    `
}

/**
 * Borrar usuario
 * TODO AGREGAR CONFIRMACIÓN ANTES DE BORRAR
 */

const delUser = (userID) =>{
    
    deldata(urlUSER, 'DELETE', userID)
    .then((res) => {
        console.log('res ',res)
    })
    .catch((err) =>{
        console.log('error ', err)
    })
}

/**
 * Carga valores del usuario en el formulario para actualizar valor
 */
const setValueUser = (order, name,last, email, profile)=>{
    const listToUpdate = JSON.parse( sessionStorage.getItem("userList")) ;
    console.log(listToUpdate[order]);
    NAMEUPDATE.setAttribute('value',name);
    LASTNAME.setAttribute('value',last);
    EMAIL.setAttribute('value',email);
    PROFILE.setAttribute('value',profile);

};

/**
 * Actualizar usuario
 * Levantar el value del contacto y hacer put
 */
const updateUser = () =>  {
    
    const data = {
        first_name: NAMEUPDATE.value ,
        last_name: LASTNAME.value , 
        email:EMAIL.value , 
        password: PASS.value, 
        profile: PROFILE.value
    }
    fetchdata(urlUSER,'PUT', data)
    .then((res) => {
        console.log("res ", res)
        const dataReset = document.querySelectorAll('#nameForm, #lastName, #emailInput, #profile, #inputPassword')
        dataReset.forEach(input => {
            input.value = '';
        });
        
        //const form = document.getElementById('formUserupdate');  
        //form.reset();
        
    })
    .catch((err) =>{
        console.log("err ",err)
    })

}

/**
 * Cierre el modal sin guardar los cambios
 */
const cancelBTN = () =>{
    alert("boton cerrar");
}

USERSEARCHBTN.addEventListener('click',searchUser);
USERSEARCHBTN.addEventListener('keypress', (z)=>{ if(z.keyCode === 13) return searchUser });
UPDATEBT.addEventListener('click', updateUser );
UPDATEBT.addEventListener('keypress', (z)=>{ if(z.keyCode === 13) return updateUser });
CANCELBTN.addEventListener('click', cancelBTN );
