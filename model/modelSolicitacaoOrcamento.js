var dadosJSON;
const sql = require('../config/sql');
const nodemailer = require("nodemailer");

var solicitacaoOrcamento = {
  idSolicitacao:   0,
  cpfCliente:     '',
  cpfAutonomo:    '',
  descricao:      '',
  tipo:           '',

  criar: function (entradaJSON) { // async
    console.log('Criado! ' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(solicitacaoOrcamento.tipo + " em formato Obj JSON");
    sql.criarSolicitacaoOrcamento(solicitacaoOrcamento);
    // var retornoEmail = await solicitacaoOrcamento.enviar(solicitacaoOrcamento);
  },

  enviar: async function (entradaJSON) {


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
    var info1 = await configuracoes.sendMail({
      from: 'diegodareformaaqui@gmail.com', // sender address
      to: eCliente, // list of receivers
      subject: "Solicitação de serviços a um " + entradaJSON.tipo, // Subject line
      text: "Olá, " + clienteTemp.nome + ": \n\n Tua solicitação foi enviada a " + autonomoTemp.nome +
        ". \nFavor aguardar a resposta do autônomo, que recebeu também uma cópia deste e-mail." +
        " \n\nAtenciosamente \n\nDiego da ReformaAqui", // plain text body
      html: "<b>Diego da ReformaAqui</b>" // html body
    });

    // send mail with defined transport object
    var info2 = await configuracoes.sendMail({
      from: 'diegodareformaaqui@gmail.com', // sender address
      to: eAutonomo, // list of receivers
      subject: "Solicitação de serviços a um " + entradaJSON.tipo, // Subject line
      text: "Olá, " + clienteTemp.nome + ": \n\n Tua solicitação foi enviada a " + autonomoTemp.nome +
        ". \nFavor aguardar a resposta do autônomo, que recebeu também uma cópia deste e-mail." +
        " \n\nAtenciosamente \n\nDiego da ReformaAqui", // plain text body
      html: "<b>Diego da ReformaAqui</b>" // html body
    });

    // send mail with defined transport object
    var info3 = await configuracoes.sendMail({
      from: 'diegodareformaaqui@gmail.com', // sender address
      to: 'diegodareformaaqui@gmail.com', // list of receivers
      subject: "Solicitação de serviços a um " + entradaJSON.tipo, // Subject line
      text: "Olá, " + clienteTemp.nome + ": \n\n Tua solicitação foi enviada a " + autonomoTemp.nome +
        ". \nFavor aguardar a resposta do autônomo, que recebeu também uma cópia deste e-mail." +
        " \n\nAtenciosamente \n\nDiego da ReformaAqui", // plain text body
      html: "<b>Diego da ReformaAqui</b>" // html body
    });

    return info1 + " ; " + info2 + " ; " + info3;

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

    return solicitacaoOrcamento;

  },

  visualizarTodos: async function (entradaJSON) {
    console.log(entradaJSON);
    var dadosJSON = converterParaObjetoJSON(entradaJSON);

    var aux = await sql.consultarSolicitacoesOrcamentos(dadosJSON);

    console.log("Aux: " + aux); // 1

    aux = JSON.parse(aux);

    return aux;

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
