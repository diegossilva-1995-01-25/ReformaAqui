var dadosJSON;
const sql = require('../config/sql');

var recomendacao = {
  cpfAutonomo:    '',
  cpfCliente:     '',
  funcao:         '',
  descricao:      '',

  criar: function (entradaJSON) {
    console.log('Criado! ' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(recomendacao.funcao + " em formato Obj JSON");
    sql.criarRecomendacao(recomendacao);
  },

  editar: function (entradaJSON) {
    console.log('Criado! ' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(recomendacao.funcao + " em formato Obj JSON");
    sql.editarRecomendacao(recomendacao);
  },

  visualizar: function (entradaJSON) {
    var aux;
    console.log("Encontrado " + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    console.log(dadosJSON.nome + " em formato Obj JSON");

    aux = await sql.consultarRecomendacao(dadosJSON);

    console.log("Aux: " + aux); // 1

    aux = JSON.parse(aux);

    preencher(aux);

  },

};

function converterParaObjetoJSON(jsonString) {
  return JSON.parse(jsonString);
}

function limpar() {
  recomendacao.cpfAutonomo = '';
  recomendacao.cpfCliente = '';
  recomendacao.funcao = '';
  recomendacao.descricao = '';
}

function preencher(dados) {
  limpar();
  recomendacao.cpfAutonomo = dados.cpfAutonomo;
  recomendacao.cpfCliente = dados.cpfCliente;
  recomendacao.funcao = dados.funcao;
  recomendacao.descricao = dados.descricao;
}

module.exports = recomendacao;

// function criar () {
//
// }
//
// function editar () {
//
// }
//
// function visualizar () {
//   return recomendacao;
// }
