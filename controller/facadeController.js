// const path = require('path');

var httpVerb = "";
var nomeTela = "";

async function callController(verb, tela, dadosEntrantes) {

  var retornoParaRoute;

  setHttpVerb(verb);
  setNomeTela(tela);
  const controller = require(__dirname + '/../controller/ctrl' + tela + '.js');

  if (tela.includes("login") || verb == "get" || verb == "GET") {
    retornoParaRoute = await controller.pegarMetodoHttp(verb, dadosEntrantes);

    return retornoParaRoute;

  } else {
    controller.pegarMetodoHttp(verb, dadosEntrantes);

  }

}

function setHttpVerb(verb) {
  httpVerb = verb;
}

function setNomeTela(tela) {
  nomeTela = tela;
}

module.exports.callController = callController;
module.exports.setHttpVerb = setHttpVerb;
module.exports.setNomeTela = setNomeTela;
