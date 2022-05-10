import { fetchdata, getdata } from './fetchdata.js';


//Constantes
const NAME = document.querySelector('#name');
const LASTNAME = document.querySelector('#lastName');
const EMAIL = document.querySelector('#emailInput');
const PROFILE = document.querySelector('#profile');
const PASS = document.querySelector('#inputPassword');
const USERSEARCHBTN = document.querySelector('#searchUserbtn');

const testMark = document.querySelector('#testMark');

const urlUSER = `http://localhost:3010/api/user/`;
const urlALL = `http://localhost:3010/api/user/all`;

const searchUser = () =>{
    
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
            element += markUpSearch(array[e].email,
                array[e].first_name,
                array[e].last_name);
          }  
        console.log("res  ", res)
        console.log("element ", element)
        console.log("array ", array)
      
        testMark.innerHTML = element;
    })
    
    .catch((err)=>{
        console.log('error =>', err)
    })
}
//TODO formatear el html
const markUpSearch = (a,b,c) => {
    return `
    ${a}
    ${b}
    ${c}
    `
}
USERSEARCHBTN.addEventListener('click',searchUser);
USERSEARCHBTN.addEventListener('keypress', (z)=>{ if(z.keyCode === 13) return searchUser });