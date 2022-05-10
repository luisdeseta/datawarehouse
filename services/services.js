//REVISAR Y ELIMINAR

//constantes
const urlLogin = `http://localhost:3010/admin/login`;
const urlUSER = `http://localhost:3010/api/user`;



//services

//login del admin
export const apiLogin = (data) =>{
    console.log('apiLogin '+ data);
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');
    
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: myHeaders
    };
    return new Promise ((resolve, reject) =>{
        fetch (urlLogin, requestOptions)
        .then((res) => res.json())
        .then((data) =>resolve(data))
        .catch((err) => reject(err));
        
    })
}

//services userdashboard.js

export const createUSER = (data) =>{
    var myHeaders = new Headers();
    //myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbS5hciIsInBhc3N3b3JkIjoiJDJiJDEwJHZILndKWnB0d0syR1ouVEVpWkkuT3VYdFR4em1vY08vM3Fhb3lDV1pLSkN6eXpCeTZyY2lhIiwicHJvZmlsZSI6IkEiLCJpYXQiOjE2NTE5NTk2OTR9.4RTSIN-TknL9D_vT2QP-0BFWw_mwVSRg6zWoo9Jfs821bZnbAiXVGZdAjXDU9B20Fc1dgFm-SJUw7Mi6-y_bVA");
    myHeaders.append('Content-Type', 'application/json');
    const requestOptions = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: myHeaders
    };
    return new Promise ((resolve, reject) =>{
        fetch (urlUSER, requestOptions)
        .then((res) => res.json())
        .then((data) =>resolve(data))
        //.then(response => { console.log(response.headers.get('Authorization')) })
        .catch((err) => reject(err));
        
    })  
}


export const test = () =>{
    fetch("http://localhost:3010/admin/testing", requestOptions)
  .then(response => response.text())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
} 