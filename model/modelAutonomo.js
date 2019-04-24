var dadosJSON = JSON.stringify("{}");
const sql = require('../config/sql');
var cookie = JSON.parse("{}");

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

  visualizar: function (entradaJSON) {
    var aux;
    console.log("Encontrado " + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    console.log(dadosJSON.nome + " em formato Obj JSON");

    sql.consultarClienteEmail(autonomo, function (retorno) {
      aux = retorno;
      dadosJSON = JSON.parse(aux);
      preencher(dadosJSON);
      aux = JSON.stringify(autonomo);
      cookie = JSON.parse(aux);
    });

  },

  fazerLogin: function (entradaJSON) {
    var aux;
    console.log("Encontrado " + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencherLogin(dadosJSON);
    sql.consultarAutonomoCPFeEmail(autonomo, function (retorno) {
      aux = retorno;
      dadosJSON = JSON.parse(aux);
      preencher(dadosJSON);
      aux = JSON.stringify(autonomo);
      cookie = JSON.parse(aux);
      console.log("Oi");
      redirec.route('/', function (req, res, next, id) {
        console.log(res.cookie('email', cookie.email));
        console.log(res.cookie('nome', cookie.nome));
        res.redirect('/');

      });

    }); // Faça um callback aqui
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
