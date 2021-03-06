// FAÇA JSON DOS DADOS AO CHEGAR AQUI!
var metodo = "";
var nomeEntidade = "solicitacaoOrcamento";
var dadosJSON = "";
var obejetoRetorno;

async function pegarMetodoHttp(verbo, dadosEntrantes) {

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
    obejetoRetorno = await models.callEntity(metodo, nomeEntidade, dadosJSON);

    return obejetoRetorno;

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

module.exports.pegarMetodoHttp = pegarMetodoHttp;
