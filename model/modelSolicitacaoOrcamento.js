var dadosJSON;
const sql = require('../config/sql');
const nodemailer = require("nodemailer");

var solicitacaoOrcamento = {
  idSolicitacao:   0,
  cpfCliente:     '',
  cpfAutonomo:    '',
  descricao:      '',
  tipo:           '',

  criar: function (entradaJSON) {
    console.log('Criado! ' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(autonomo.nome + " em formato Obj JSON");
    sql.criarSolicitacaoOrcamento(solicitacaoOrcamento);
  },

  enviar: function (entradaJSON) {

  },

  editar: function (entradaJSON) {
    console.log('Criado! ' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(autonomo.nome + " em formato Obj JSON");
    sql.editarSolicitacaoOrcamento(solicitacaoOrcamento);
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
  solicitacaoOrcamento.idSolicitacao = 0;
  solicitacaoOrcamento.cpfCliente = '';
  solicitacaoOrcamento.cpfAutonomo = '';
  solicitacaoOrcamento.descricao = '';
  solicitacaoOrcamento.tipo = '';
}

function preencher(dados) {
  limpar();
  solicitacaoOrcamento.idSolicitacao = dados.idSolicitacao;
  solicitacaoOrcamento.cpfCliente = dados.cpfCliente;
  solicitacaoOrcamento.cpfAutonomo = dados.cpfAutonomo;
  solicitacaoOrcamento.descricao = dados.descricao;
  solicitacaoOrcamento.tipo = dados.tipo;
}

module.exports = solicitacaoOrcamento;

// function criar () {
//
// }
//
// function enviar () {
//
// }
//
// function visualizar () {
//   return solicitacaoOrcamento;
// }
