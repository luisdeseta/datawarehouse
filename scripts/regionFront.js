import { fetchdata, getdata, deldata, getD } from '../routes/fetchdata.js';
//constantes
const testBTN = document.querySelector('#addRegionBTN')
//URL para fetch
const urlRegion = `http://localhost:3010/geo/region/`;
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
        'url': 'http://localhost:3010/tree/allzz/',
        'data': function (node) {
          return { 'id': node.id };
        }
      }
    },
    "plugins": [
      "contextmenu", "dnd", "search",
      "state", "types", "wholerow"
    ]

  });
  // 7 bind to events triggered on the tree
  $('#jstree').on("changed.jstree", function (e, data) {
    console.log(data.selected);
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