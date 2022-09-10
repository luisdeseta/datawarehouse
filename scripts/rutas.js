const PORT = `3010`;
const HOST = `localhost`;
export const rutas = {
    urlCIA: `http://${HOST}:${PORT}/company/cia/`,
    urlALLCITY: `http://${HOST}:${PORT}/cities/city`,
    urlCOUNRTY: `http://${HOST}:${PORT}/country/countries`,
    urlCITYBYCOUNTRY: `http://${HOST}:${PORT}/cities/citybycountry/`,
    url1Country: `http://${HOST}:3010/country/country`,
    urlRegion: `http://${HOST}:3010/geo/region`,

    urlAllCia: `http://${HOST}:3010/company/cia/companies`,
    urlLogin: `http://${HOST}:${PORT}/admin/login`,
    urlUSER: `http://${HOST}:${PORT}/api/user/login`,

    urlUSER: `http://${HOST}:${PORT}/api/user/`,
    urlALL: `http://${HOST}:${PORT}/api/allusers`,

    urlCONTACT: `http://${HOST}:${PORT}/contact/contact/`,
    urlALLCONTACT: `http://${HOST}:${PORT}/contact/getall/`,
    urlCONTACTGEO: `http://${HOST}:${PORT}/contact/region/`,
    urlCONTACTCIA: `http://${HOST}:${PORT}/contact/company/`,
    urlALLCONTACTINFO: `http://${HOST}:${PORT}/contact/allcontactinfo/`,


    test: `http://${HOST}:${PORT}/tree/allzz/`,
}
