var dadosJSON;
const sql = require('../config/sql');
const nodemailer = require("nodemailer");

var orcamento = {
  idOrcamento:     0,
  idSolicitacao:   0,
  cpfCliente:     '',
  cpfAutonomo:    '',
  descricao:      '',
  tipo:           '',
  preco:           0,
  previsaoDias:    0,
  status:         '',

  criar: function (entradaJSON) {
    console.log('Criado! ' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(autonomo.nome + " em formato Obj JSON");
    sql.criarOrcamento(orcamento);
  },

  enviar: function (entradaJSON) {

  },

  visualizar: function (entradaJSON) {
    console.log(this.cpf);
    return this;
  },

  aceitar: function (entradaJSON) {

  },

  comparar: function (entradaJSON) {

  },

  editar: function (entradaJSON) {
    console.log('Criado! ' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(autonomo.nome + " em formato Obj JSON");
    sql.editarOrcamento(orcamento);
  }

};

function converterParaObjetoJSON(jsonString) {
  return JSON.parse(jsonString);
}

function limpar() {
  orcamento.idOrcamento = 0;
  orcamento.idSolicitacao = 0;
  orcamento.cpfCliente = '';
  orcamento.cpfAutonomo = '';
  orcamento.descricao = '';
  orcamento.tipo = '';
  orcamento.preco = 0;
  orcamento.previsaoDias = 0;
  orcamento.status = '';
}

function preencher(dados) {
  limpar();
  orcamento.idOrcamento = dados.idOrcamento;
  orcamento.idSolicitacao = dados.idSolicitacao;
  orcamento.cpfCliente = dados.cpfCliente;
  orcamento.cpfAutonomo = dados.cpfAutonomo;
  orcamento.descricao = dados.descricao;
  orcamento.tipo = dados.tipo;
  orcamento.preco = dados.preco;
  orcamento.previsaoDias = dados.previsaoDias;
  orcamento.status = dados.status;
}

module.exports = orcamento;

// duplicação em diagramas: tem descricao em solicitacaoOrcamento e orcamento
// Status aqui: aceito, pendente e recusado

// function criar () {
//
// }
//
// function enviar () {
//
// }
//
// function visualizar () {
//   return orcamento;
// }
//
// function aceitar () {
//
// }
//
// function comparar () {
//
// }
//
// function editar () {
//
// }
