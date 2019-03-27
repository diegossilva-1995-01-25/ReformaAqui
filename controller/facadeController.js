// const path = require('path');

var httpVerb = "";
var nomeTela = "";

function callController(verb, tela, dadosEntrantes) {

  setHttpVerb(verb);
  setNomeTela(tela);
  const controller = require(__dirname + '/../controller/ctrl' + tela + '.js');

  controller.pegarMetodoHttp(verb, dadosEntrantes);

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
