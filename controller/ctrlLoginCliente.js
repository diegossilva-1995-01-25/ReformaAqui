// FAÇA JSON DOS DADOS AO CHEGAR AQUI!
var metodo = "POST";
var nomeEntidade = "loginCliente";
var dadosJSON = JSON.stringify("{}");

function pegarMetodoHttp(verbo, dadosEntrantes) {

  const models = require(__dirname + '/../model/facadeModel.js');

  // Método responsável por converter o objeto JavaScript em String JSON
  dadosJSON = JSON.stringify(dadosEntrantes);
  console.log(dadosJSON);

  models.callEntity(metodo, nomeEntidade, dadosJSON);

}

module.exports.pegarMetodoHttp = pegarMetodoHttp;
