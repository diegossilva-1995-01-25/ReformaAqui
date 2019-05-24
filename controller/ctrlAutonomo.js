// FAÇA JSON DOS DADOS AO CHEGAR AQUI!
var metodo = "";
var nomeEntidade = "autonomo";
var dadosJSON = JSON.stringify("{}");

async function pegarMetodoHttp(verbo, dadosEntrantes) {

  const models = require(__dirname + '/../model/facadeModel.js');

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
