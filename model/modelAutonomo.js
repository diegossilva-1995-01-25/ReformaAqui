var dadosJSON = JSON.stringify("{}");
const sql = require('../config/sql');
const requisicao = require('request');
var cookieNome = '';
var cookieEmail = '';
var cookieCPF = '';

var autonomo = {
  cpf:             0,
  email:          '',
  nome:           '',
  endereco:       '',
  bairro:         '',
  telefone:       '',
  celular:        '',
  funcaoPrimaria: '',
  outrasFuncoes:  '',
  pendencias:     '',
  senha:          '',

  criar: function (entradaJSON) {
    console.log('Criado! ' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(autonomo.nome + " em formato Obj JSON");
    sql.criarAutonomo(autonomo);
  },

  editar: function (entradaJSON) {
    console.log('Editado!' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(autonomo.nome + " em formato Obj JSON");
    // sql.editarAutonomo(autonomo);
  },

  visualizar: async function (entradaJSON) {
    var aux;
    console.log("Encontrado " + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    console.log(dadosJSON.nome + " em formato Obj JSON");

    aux = await sql.consultarAutonomoCPFeEmail(dadosJSON);

    console.log("Aux: " + aux); // 1

    aux = JSON.parse(aux);

    preencher(aux);

  },

  fazerLogin: async function (entradaJSON) {
    var aux;
    console.log("Encontrado " + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    aux = await sql.consultarAutonomoCPFeEmail(dadosJSON); //, function (retorno) {

    console.log("Aux: " + aux); // 1

    aux = JSON.parse(aux);

    console.log(dadosJSON.senha + " e " + aux.senha);

    if(dadosJSON.senha != aux.senha) {
      console.log("Senha incorreta!");

    } else if (dadosJSON.cpf != aux.cpf) {
      console.log("CPF incorreto!");

    } else {
      preencher(aux);
      console.log("Logado: " + autonomo.nome);

      cookieEmail = autonomo.email;
      cookieNome = autonomo.nome;
      cookieCPF = autonomo.cpf;

    }

    requisicao(__dirname + '/../html/index.html', function (error, response, body) {
      if (!error && response.statusCode == 200) {
        console.log(body) // Print the google web page.
      }
    });

  }

};

function converterParaObjetoJSON(jsonString) {
  return JSON.parse(jsonString);
}

function limpar() {
  autonomo.cpf = 0;
  autonomo.email = '';
  autonomo.nome = '';
  autonomo.endereco = '';
  autonomo.bairro = '';
  autonomo.telefone = '';
  autonomo.celular = '';
  autonomo.funcaoPrimaria = '';
  autonomo.outrasFuncoes = '';
  autonomo.pendencias = '';
  autonomo.senha = '';
}

function preencher(dados) {
  limpar();
  autonomo.cpf = dados.cpf;
  autonomo.email = dados.email;
  autonomo.nome = dados.nome;
  autonomo.endereco = dados.endereco;
  autonomo.bairro = dados.bairro;
  autonomo.telefone = dados.telefone;
  autonomo.celular = dados.celular;
  autonomo.funcaoPrimaria = dados.funcaoPrimaria;
  autonomo.outrasFuncoes = dados.outrasFuncoes;
  autonomo.pendencias = dados.pendencias;
  autonomo.senha = dados.senha;
}

function limparLogin() {
  cliente.cpf = 0;
  cliente.email = '';
  cliente.senha = '';
}

function preencherLogin(dados) {
  limpar();
  cliente.cpf = dados.cpf;
  cliente.email = dados.email;
  cliente.senha = dados.senha;
}

module.exports = autonomo;

// function criar() {
//
// }
//
// function editar() {
//
// }
//
// function visualizar () {
//   return trabalhador;
// }
//
// function fazerLogin () {
//   return trabalhador;
// }
