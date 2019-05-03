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
    console.log(solicitacaoOrcamento.tipo + " em formato Obj JSON");
    sql.criarSolicitacaoOrcamento(solicitacaoOrcamento);
    //enviar(entradaJSON);
  },

  enviar: function (entradaJSON) {
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log('Sendo enviado! ' + entradaJSON);

    // Usar nodemailer aqui
  },

  editar: function (entradaJSON) {
    console.log('Criado! ' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(solicitacaoOrcamento.tipo + " em formato Obj JSON");
    sql.editarSolicitacaoOrcamento(solicitacaoOrcamento);
  },

  visualizar: async function (entradaJSON) {
    var aux;
    console.log("Encontrado " + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    console.log(dadosJSON.nome + " em formato Obj JSON");

    aux = await sql.consultarSolicitacaoOrcamento(dadosJSON);

    console.log("Aux: " + aux); // 1

    aux = JSON.parse(aux);

    preencher(aux);

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
