//Para hacer llamados al servicio del backend, levanta el token del localstorage y 
//lo envia con un method como variable

export const fetchdata = (url, method, data = {}) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token")); //esto manda el token al header
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
        method: method,
        body: JSON.stringify(data),
        headers: myHeaders,
        redirect: 'follow'
    };
    return new Promise((resolve, reject) => {
        fetch(url, requestOptions)
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));

        //console.log("fetchdata ", data)
    })
}
/**
 * el metodo get no puede tener body
 * se pasa el parametro por url
 */
export const getdata = (url, method, data = {}) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token")); //esto manda el token al header
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
        method: method,
        //body: JSON.stringify(data),
        headers: myHeaders,
        redirect: 'follow'
    };
    return new Promise((resolve, reject) => {
        fetch(`${url}${data}`, requestOptions)
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));

        //console.log("fetchdata ", data)
    })
}
/**
 * Alternativa a getdata para procesar el endpoint por req.query
 */
export const getdata2 = (url, method, data = {}) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token")); //esto manda el token al header
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
        method: method,
        //body: JSON.stringify(data),
        headers: myHeaders,
        redirect: 'follow'
    };
    return new Promise((resolve, reject) => {
        fetch(`${url}${data}`, requestOptions)
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));

        //console.log("fetchdata ", data)
    })
}

//Delete Data
export const deldata = (url, method, data = {}) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token")); //esto manda el token al header
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
        method: method,
        //body: JSON.stringify(data),
        headers: myHeaders,
        redirect: 'follow'
    };
    return new Promise((resolve, reject) => {
        fetch(`${url}${data}`, requestOptions)
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));

        //console.log("fetchdata ", data)
    })
}

export const getD = (url, method) => {
    var myHeaders = new Headers();
    myHeaders.append("Authorization", "Bearer " + localStorage.getItem("token")); //esto manda el token al header
    myHeaders.append('Content-Type', 'application/json');

    const requestOptions = {
        method: method,
        //body: JSON.stringify(data),
        headers: myHeaders,
        redirect: 'follow'
    };
    return new Promise((resolve, reject) => {
        fetch(`${url}`, requestOptions)
            .then((res) => res.json())
            .then((data) => resolve(data))
            .catch((err) => reject(err));

        //console.log("fetchdata ", data)
    })
}