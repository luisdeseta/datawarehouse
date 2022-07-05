import { fetchdata, getdata, deldata, getD } from '../routes/fetchdata.js';
//constantes
const testBTN = document.querySelector('#addRegionBTN')
//URL para fetch
const urlRegion = `http://localhost:3010/geo/region/`;
const urlCountry = `http://localhost:3010/country/country`;
const urlRegiontest = `http://localhost:3010/geo/region/`;
const test = 'http://localhost:3010/tree/allzz/'

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
    /* "contextmenu": {
      "items": function ($node, data) {
        var tree = $("#jstree").jstree(true);
        return {
          "Create": {
            "separator_before": false,
            "separator_after": false,
            "label": "Crear",
            "action": function (obj) {
              var parent = '19'
              $node = tree.create_node(parent, $node, 'first',console.log($node) );
              tree.edit($node);
              console.log($node)
            }
          },
          "Rename": {
            "separator_before": false,
            "separator_after": true,
            "label": "Renombrar",
            "action": function (obj) {
              tree.edit($node);

            }
          },
          "Remove": {
            "separator_before": false,
            "separator_after": false,
            "label": "Borrar",
            "action": function (obj) {
              tree.delete_node($node);
            }
          }
        };
      }
    } */

  })
    //callback para cada opcion del menu desplegable
    .on('create_node.jstree', function (e, data) {
      //TODO, como saber si es la ruta para country, ciudad o city => ¿guardar regiones en localstorage y poner un if?
      const newNode = { parent: data.parent, name: data.node.text }
      fetchdata(urlCountry, 'POST', newNode)
        .then((res) => {
          const node = { name: data.node.text };
          console.log('res data.node ', data.node);
        })
        .catch((err) => {
          console.log('error ', err)
        })

    })
    .on('rename_node.jstree', function (e, data) {

      //name: node.original.text, es el nombre que estoy cambiando (ver parametors de la ruta)
      // newName: data.node.text es el nombre que paso para cambiar el nombre del nodo.
      //TODO si el parent en # uso una ruta, sino...Bontones CRUD  de region en el header
      const node = { parent: data.node.parent, name: data.node.original.text, newName: data.node.text }
      console.log('node inicial', node)
      fetchdata(urlCountry, 'PUT', node)
        .then((res) => {
          console.log('res rename2', data.node)
        })
        .catch((err) => {
          console.log('error rename ', err)
        })


    })
    .on('delete_node.jstree', function (e, data) {
      const node = { name: data.node.text }
      //console.log('res delete', data.node)
      fetchdata(urlCountry, 'DELETE', node)
        .then((res) => {
          console.log(`Delete ${data.node.text} Complete`)
        })
        .catch((err) => {
          console.log('Delete Error ', err)
        })


    })


  // 7 bind to events triggered on the tree
  $('#jstree').on("changed.jstree", function (e, data) {
    console.log('changed.jstre  data.node.parent  ', data.node);
    //Buscar en varias tablas si es verdadero, guardo eso como parametro en una variables
    // if (busco en regiones) true guardo false, sigo con otro if

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



testBTN.addEventListener('click', regionTree)