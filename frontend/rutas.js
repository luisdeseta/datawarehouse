const PORT = `3010`;
const HOST = `localhost`;
export const rutas = {
    urlCIA: `http://${HOST}:${PORT}/company/cia/`,
    urlALLCITY: `http://${HOST}:${PORT}/cities/city`,
    urlCOUNRTY: `http://${HOST}:${PORT}/country/countries`,
    urlCITYBYCOUNTRY: `http://${HOST}:${PORT}/cities/citybycountry/`,
    url1Country: `http://${HOST}:3010/country/country`,
    url1CountryByRegion: `http://${HOST}:3010/country/countrybyregion/`,
    urlRegion: `http://${HOST}:3010/geo/region`,
    urlALLRegion: `http://${HOST}:3010/geo/all`,

    urlAllCia: `http://${HOST}:3010/company/cia/companies`,
    urlAllDataCia: `http://${HOST}:3010/company/cia/allcompanies`,
    urlLogin: `http://${HOST}:${PORT}/admin/login`,
    urlUSER: `http://${HOST}:${PORT}/api/user/login`,

    urlUSER: `http://${HOST}:${PORT}/api/user/`,
    urlALL: `http://${HOST}:${PORT}/api/allusers`,

    //para buscar un contacto. Trae todos los contactoes en un solo objeto
    urlCONTACT: `http://${HOST}:${PORT}/contact/contact/`,
    urlALLCONTACT: `http://${HOST}:${PORT}/contact/getall/`,
    urlCONTACTGEO: `http://${HOST}:${PORT}/contact/region/`,
    urlCONTACTCIA: `http://${HOST}:${PORT}/contact/company/`,
    //Trae todos los datos en un ARRAY  objeto para mostrar todo el front:
    urlALLCONTACTINFO: `http://${HOST}:${PORT}/contact/allcontactinfo/`,

    urlcontactChannels: `http://${HOST}:${PORT}/contactandchannels/contactchannels`,
    //bulkcreate para varios canales
    urlcontactChannelsBulk: `http://${HOST}:${PORT}/contactandchannels/contactchannels/creates`,
    urlcontactChannelByContact: `http://${HOST}:${PORT}/contactandchannels/contactchannels/contact/`,


    test: `http://${HOST}:${PORT}/tree/allzz/`,
}
