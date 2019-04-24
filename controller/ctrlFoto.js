// FAÇA JSON DOS DADOS AO CHEGAR AQUI!
var metodo = "";
var nomeEntidade = "foto";
var dadosJSON = "";

function pegarMetodoHttp(verbo, dadosEntrantes) {

  const models = require(__dirname + '/../model/facadeModel.js');

  // Método responsável por converter o objeto JavaScript em String
  dadosJSON = JSON.stringify(dadosEntrantes);
  console.log(dadosJSON);

  if (verbo == 'POST' || verbo == 'post') {
    pegarPOST();

  } else if (verbo == 'PUT' || verbo == 'put') {
    pegarPUT();

  } else if (verbo == 'GET' || verbo == 'get') {
    pegarGET();

  } else if (verbo == 'DELETE' || verbo == 'delete') {
    pegarDELETE();

  }

  models.callEntity(metodo, nomeEntidade, dadosJSON);

}

function pegarPOST() {
  metodo = 'POST';
}

function pegarPUT() {
  metodo = 'PUT';
}

function pegarGET() {
  metodo = 'GET';
}

function pegarDELETE() {
  metodo = 'DELETE';
}

module.exports.pegarMetodoHttp = pegarMetodoHttp;
