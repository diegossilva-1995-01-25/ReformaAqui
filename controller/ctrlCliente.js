// FAÇA JSON DOS DADOS AO CHEGAR AQUI!
var metodo = "";
var nomeEntidade = "cliente";
var dadosJSON = JSON.stringify("{}");

async function pegarMetodoHttp(verbo, dadosEntrantes) {

  var obejetoRetorno;
  const models = require(__dirname + '/../model/facadeModel.js');

  // Método responsável por converter o objeto JavaScript em String JSON
  dadosJSON = JSON.stringify(dadosEntrantes);
  console.log(dadosJSON);

  if (verbo == 'POST' || verbo == 'post') {
    pegarPOST();
    models.callEntity(metodo, nomeEntidade, dadosJSON);

  } else if (verbo == 'PUT' || verbo == 'put') {
    pegarPUT();
    models.callEntity(metodo, nomeEntidade, dadosJSON);

  } else if (verbo == 'GET' || verbo == 'get') {
    pegarGET();
    obejetoRetorno = await models.callEntity(metodo, nomeEntidade, dadosJSON);
    
    return obejetoRetorno;

  }



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

module.exports.pegarMetodoHttp = pegarMetodoHttp;
