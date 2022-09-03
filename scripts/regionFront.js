import { fetchdata, getdata, deldata, getD } from '../routes/fetchdata.js';
//constantes
const addREGIONBTN = document.querySelector('#addRegionBTN')
const NEWREGION = document.querySelector('#regionName');
const CREATEREGIONBTN = document.querySelector('#createRegionBtn')
const REGIONMODAL = document.querySelector('#regionFormContainer');
const CANCELBTN = document.querySelector('#cancelRegionBtn');
//URL para fetch
const urlRegion = `http://localhost:3010/geo/region`;
const urlCountry = `http://localhost:3010/country/country`;
const urlCity = `http://localhost:3010/cities/city`;
const test = 'http://localhost:3010/tree/allzz/';

/**jstree
 * Codigo para plantar el arbol
 */

$(function () {
  // 6 create an instance when the DOM is ready
  $('#jstree').jstree({
    'core': {
      "animation": 0,
      "check_callback": true,
      "themes": { "stripes": true },
      'data': {
        'url': test,
        'data': function (node) {
          return { 'id': node.id };
        }
      }
    },
    "plugins": ["contextmenu"],


  })
    //callback para cada opcion del menu desplegable
    .on('create_node.jstree', function (e, data) {
      //node.parents es un array con el id de elemento y todos los
      //parentID del arbol
      const parents = data.node.parents

      var urlJStree
      if (parents.length == 1) {
        urlJStree = urlRegion
      } else if (parents.length == 2) {
        urlJStree = urlCountry
      } else if (parents.length == 3) {
        urlJStree = urlCity
      }
      const newNode = { parent: data.parent, name: data.node.text }
      fetchdata(urlJStree, 'POST', newNode)
        .then((res) => {
          const node = { name: data.node.text };
          console.log('res create data.node ', data.node);

        })
        .catch((err) => {
          //console.log('error create data.node.parents length', parents.length)
          console.log('error ', err)
        })


    })
    .on('rename_node.jstree', function (e, data) {

      //name: node.original.text, es el nombre que estoy cambiando (ver parametors de la ruta)
      //newName: data.node.text es el nombre que paso para cambiar el nombre del nodo.
      const node = { parent: data.node.parent, name: data.node.original.text, newName: data.node.text }

      const parents = data.node.parents

      var urlJStree
      if (parents.length == 1) {
        urlJStree = urlRegion
      } else if (parents.length == 2) {
        urlJStree = urlCountry
      } else if (parents.length == 3) {
        urlJStree = urlCity
      }
      //console.log('data.node rename ', data.node)
      fetchdata(urlJStree, 'PUT', node)
        .then((res) => {
          //console.log('urlTarget ', urlTarget)
          console.log('res rename data.node', data.node)
        })
        .then((res) => {
          //recarga el node. Sirva para evitar errores de creacion de childrens
          $('#jstree').jstree(true).refresh();
        })
        .catch((err) => {
          console.log('error ', err)
        })


    })
    .on('delete_node.jstree', function (e, data) {
      const node = { name: data.node.text }
      //console.log('res delete', data.node)

      const parents = data.node.parents

      var urlJStree
      if (parents.length == 1) {
        urlJStree = urlRegion
      } else if (parents.length == 2) {
        urlJStree = urlCountry
      } else if (parents.length == 3) {
        urlJStree = urlCity
      }
      fetchdata(urlJStree, 'DELETE', node)
        .then((res) => {
          console.log(`Delete ${data.node.text} Complete`)
        })
        .catch((err) => {
          console.log('Delete Error ', err)
        })


    })


  // 7 bind to events triggered on the tree
  $('#jstree').on("changed.jstree", function (e, data) {
    console.log('changed.jstre  data.node  ', data.node);

  });
  // Se carga todo el Arbol con los nodos abiertos
  $('#jstree').on('ready.jstree', function () {
    $("#jstree").jstree("open_all");
  });

  // 8 interact with the tree - either way is OK
  $('button').on('click', function () {
    $('#jstree').jstree(true).select_node('child_node_1');
    $('#jstree').jstree('select_node', 'child_node_1');
    $.jstree.reference('#jstree').select_node('child_node_1');
  });
});

/**
 * Consulta de base de datos
 */
const regionTree = () => {

  getD(test, 'GET')
    .then((res) => {
      console.log("res region ", res)


    }

    )
    .catch((err) => {
      console.log("error", err)
    })
}
/**
 * Crear nueva región
 */
const newRegions = () => {
  const data = {
    name: NEWREGION.value
  }
  fetchdata(urlRegion, "POST", data)
    .then((res) => {
      console.log(res)
      REGIONMODAL.style.display = "none"
      $('#jstree').jstree(true).refresh();

    })
    .catch((err) => {
      console.log(err)
    })

}
/**
 * Cierra el modal sin guardar los cambios
 */
const cancelBTN = () => {
  //alert("boton cerrar");
  REGIONMODAL.style.display = "none";
}

//testBTN.addEventListener('click', regionTree)
CREATEREGIONBTN.addEventListener('click', newRegions)
CANCELBTN.addEventListener('click', cancelBTN)
addREGIONBTN.addEventListener('click', () => { REGIONMODAL.style.display = "flex" })