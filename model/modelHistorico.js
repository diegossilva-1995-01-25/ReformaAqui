var dadosJSON;
const sql = require('../config/sql');

var historico = {
  idOrcamento:      0,
  descricao:       '',
  atraso:       false,
  numDiasAtraso:    0,
  aumentoCusto: false,
  valorAcima:       0,

  criar: function (entradaJSON) {
    console.log('Criado! ' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(autonomo.nome + " em formato Obj JSON");
    sql.criarHistorico(historico);
  },

  editar: function (entradaJSON) {
    console.log('Criado! ' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(autonomo.nome + " em formato Obj JSON");
    sql.editarHistorico(historico);
  },

  visualizar: function (entradaJSON) {
    console.log(this.cpf);
    return this;
  }

};

function converterParaObjetoJSON(jsonString) {
  return JSON.parse(jsonString);
}

function limpar() {
  historico.idOrcamento = 0;
  historico.descricao = '';
  historico.atraso = false;
  historico.numDiasAtraso = 0;
  historico.aumentoCusto = false;
  historico.valorAcima = 0;
}

function preencher(dados) {
  limpar();
  historico.idOrcamento = dados.idOrcamento;
  historico.descricao = dados.descricao;
  historico.atraso = dados.atraso;
  historico.numDiasAtraso = dados.numDiasAtraso;
  historico.aumentoCusto = dados.aumentoCusto;
  historico.valorAcima = dados.valorAcima;
}

module.exports = historico;

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
