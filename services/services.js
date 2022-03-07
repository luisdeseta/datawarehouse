//cosntantes
const urlLogin = `http://localhost:3010/api/user/login`;

//services

export const apiLogin = (data) =>{
    console.log('apiLogin '+ data);
    const urlLogin = `http://localhost:3010/api/user/login`;
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