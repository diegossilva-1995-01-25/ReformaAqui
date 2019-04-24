var dadosJSON;
const sql = require('../config/sql');

var avaliacao = {
  idAvaliacao:    0,
  idOrcamento:    0,
  numEstrelas:    0,
  descricao:     '',

  criar: function (entradaJSON) {
    console.log('Criado! ' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(avaliacao.descricao + " em formato Obj JSON");
    sql.criarAvaliacao(avaliacao);
  },

  editar: function (entradaJSON) {
    console.log('Criado! ' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(avaliacao.descricao + " em formato Obj JSON");
    sql.editarAvaliacao(avaliacao);
  },

  visualizar: function (entradaJSON) {
    var aux;
    console.log("Encontrado " + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    console.log(dadosJSON.nome + " em formato Obj JSON");

    sql.consultarClienteEmail(avaliacao, function (retorno) {
      aux = retorno;
      dadosJSON = JSON.parse(aux);
      preencher(dadosJSON);
      aux = JSON.stringify(avaliacao);
      cookie = JSON.parse(aux);
    });

  }

};

function converterParaObjetoJSON(jsonString) {
  return JSON.parse(jsonString);
}

function limpar() {
  avaliacao.idAvaliacao = 0;
  avaliacao.idOrcamento = 0;
  avaliacao.numEstrelas = 0;
  avaliacao.descricao = '';
}

function preencher(dados) {
  limpar();
  avaliacao.idAvaliacao = dados.idAvaliacao;
  avaliacao.idOrcamento = dados.idOrcamento;
  avaliacao.numEstrelas = dados.numEstrelas;
  avaliacao.descricao = dados.descricao;
}

module.exports = avaliacao;

// function criar () {
//
// }
//
// function editar () {
//
// }
//
// function consultar () {
//   return historico;
// }
