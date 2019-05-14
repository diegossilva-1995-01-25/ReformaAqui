// FAÇA JSON DOS DADOS AO CHEGAR AQUI!
var metodo = "POST";
var nomeEntidade = "loginAutonomo";
var dadosJSON = JSON.stringify("{}");

async function pegarMetodoHttp(verbo, dadosEntrantes) {

  const models = require(__dirname + '/../model/facadeModel.js');
  var obejetoRetorno;

  // Método responsável por converter o objeto JavaScript em String
  dadosJSON = JSON.stringify(dadosEntrantes);
  console.log(dadosJSON);

  obejetoRetorno = await models.callEntity(metodo, nomeEntidade, dadosJSON);

  // console.log(obejetoRetorno);

  return obejetoRetorno;

}

module.exports.pegarMetodoHttp = pegarMetodoHttp;
