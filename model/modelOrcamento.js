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
    console.log(orcamento.tipo + " em formato Obj JSON");
    sql.criarOrcamento(orcamento);
    enviar(entradaJSON);
  },

  enviar: function (entradaJSON) {
    console.log(entradaJSON);
    dadosJSON = entradaJSON;
    preencher(dadosJSON);
    console.log('Sendo enviado! ' + entradaJSON);

    var clienteTemp;
    var autonomoTemp;

    clienteTemp = await sql.consultarCliente( { "cpf": entradaJSON.cpfCliente } );
    autonomoTemp = await sql.consultarAutonomo( { "cpf": entradaJSON.cpfAutonomo } );

    // Usar nodemailer aqui
    // create reusable transporter object using the default SMTP transport
    var configuracoes = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: 'diegodareformaaqui@gmail.com',
        pass: 'MrDiego556!!'
      }
    });

    eCliente = clienteTemp.email;
    eAutonomo = autonomoTemp.email;

    // send mail with defined transport object
    let info1 = await configuracoes.sendMail({
      from: 'diegodareformaaqui@gmail.com', // sender address
      to: eCliente, // list of receivers
      subject: "Orçamento ao cliente " + entradaJSON.tipo, // Subject line
      text: "Olá, " + autonomoTemp.nome + ": \n\n Teu orçamento foi enviado a " + clienteTemp.nome +
        ". \nSe este aceitar, vai te contatar, e ele recebeu também uma cópia deste e-mail." +
        " \n\nAtenciosamente \n\nDiego da ReformaAqui", // plain text body
      html: "<b>Diego da ReformaAqui</b>" // html body
    });

    // send mail with defined transport object
    let info2 = await configuracoes.sendMail({
      from: 'diegodareformaaqui@gmail.com', // sender address
      to: eAutonomo, // list of receivers
      subject: "Orçamento ao cliente " + entradaJSON.tipo, // Subject line
      text: "Olá, " + autonomoTemp.nome + ": \n\n Teu orçamento foi enviado a " + clienteTemp.nome +
        ". \nSe este aceitar, vai te contatar, e ele recebeu também uma cópia deste e-mail." +
        " \n\nAtenciosamente \n\nDiego da ReformaAqui", // plain text body
      html: "<b>Diego da ReformaAqui</b>" // html body
    });

    // send mail with defined transport object
    let info3 = await configuracoes.sendMail({
      from: 'diegodareformaaqui@gmail.com', // sender address
      to: 'diegodareformaaqui@gmail.com', // list of receivers
      subject: "Orçamento ao cliente " + entradaJSON.tipo, // Subject line
      text: "Olá, " + autonomoTemp.nome + ": \n\n Teu orçamento foi enviado a " + clienteTemp.nome +
        ". \nSe este aceitar, vai te contatar, e ele recebeu também uma cópia deste e-mail." +
        " \n\nAtenciosamente \n\nDiego da ReformaAqui", // plain text body
      html: "<b>Diego da ReformaAqui</b>" // html body
    });


  },

  visualizar: async function (entradaJSON) {
    var aux;
    console.log("Encontrado " + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    console.log(dadosJSON.nome + " em formato Obj JSON");

    aux = await sql.consultarOrcamento(dadosJSON);

    console.log("Aux: " + aux); // 1

    aux = JSON.parse(aux);

    preencher(aux);

  },

  aceitar: function (entradaJSON) {
    // Altera para pôr status como aceito
  },

  comparar: function (entradaJSON) {
    // Query de todos os orçamentos para aquele idSolicitacao
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
