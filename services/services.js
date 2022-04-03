//constantes
const urlLogin = `http://localhost:3010/admin/login`;
const urlUSER = `http://localhost:3010/api/user`;



//services

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
    myHeaders.append("Authorization", "Bearer eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluQGVtYWlsLmNvbS5hciIsInBhc3N3b3JkIjoiJDJiJDEwJHZILndKWnB0d0syR1ouVEVpWkkuT3VYdFR4em1vY08vM3Fhb3lDV1pLSkN6eXpCeTZyY2lhIiwicHJvZmlsZSI6IkEiLCJpYXQiOjE2NDg0MjU3NjN9.YrOTCyz2gOemyZ4dxT7PRyl6CaSxLfNs7t3_zc9rOEslJo5EUzUbJWNs6QhJ5HwzYSxP6oqA7f37ReQU62jDZw");
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