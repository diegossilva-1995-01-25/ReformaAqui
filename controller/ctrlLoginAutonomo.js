// FAÇA JSON DOS DADOS AO CHEGAR AQUI!
var metodo = "POST";
var nomeEntidade = "loginAutonomo";
var dadosJSON = JSON.stringify("{}");

function pegarMetodoHttp(verbo, dadosEntrantes) {

  const models = require(__dirname + '/../model/facadeModel.js');

  // Método responsável por converter o objeto JavaScript em String
  dadosJSON = JSON.stringify(dadosEntrantes);
  console.log(dadosJSON);

  models.callEntity(metodo, nomeEntidade, dadosJSON);

}

module.exports.pegarMetodoHttp = pegarMetodoHttp;
