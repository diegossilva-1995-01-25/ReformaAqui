const expr = require('express');
const applic = expr();
// Tenta da forma de redirect do routes.js

var dadosJSON = JSON.stringify("{}");
const sql = require('../config/sql');
var cookieNome = '';
var cookieEmail = '';
var cookieCPF = '';

var cliente = {
  cpf:             0,
  email:          '',
  nome:           '',
  endereco:       '',
  bairro:         '',
  telefone:       '',
  celular:        '',
  pendencias:     '',
  senha:          '',

  criar: function (entradaJSON) {
    console.log('Criado! ' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(cliente.nome + " em formato Obj JSON");
    sql.criarCliente(cliente);
  },

  editar: function (entradaJSON) {
    console.log('Editado!' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(cliente.nome + " em formato Obj JSON");
    sql.editarCliente(cliente);
  },

  visualizar: function (entradaJSON) {
    var aux;
    console.log("Encontrado " + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    console.log(dadosJSON.nome + " em formato Obj JSON");

    aux = await sql.consultarClienteEmail(dadosJSON);

    console.log("Aux: " + aux); // 1

    aux = JSON.parse(aux);

    

  },

  fazerLogin: async function (entradaJSON) {
    var aux;
    console.log("Encontrado " + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    aux = await sql.consultarClienteEmail(dadosJSON); //, function (retorno) {

    console.log("Aux: " + aux); // 1

    aux = JSON.parse(aux);

    console.log(dadosJSON.senha + " e " + aux.senha);

    if(dadosJSON.senha == aux.senha) {
      preencher(aux);

      console.log("Logado: " + cliente.nome);



    } else {
      console.log("Senha incorreta!");
    }

      // dadosJSON = JSON.parse(aux);

      // if(entradaJSON)
      // aux = JSON.stringify(cliente);

      // redirec.route('/', function (req, res, next, id) {
      //   // Está vazio o cookie
      //   console.log(res.cookie('email', cookie.email));
      //   console.log(res.cookie('nome', cookie.nome));
      //   res.redirect('/');
      //
      // });

    //}); // Faça um callback aqui

    applic.post("/login/cliente", function (req, res) {
      //usarEstaticos();
      var caminho = path.join(__dirname + '/../html/index.html');
      console.log(caminho);
    });

  }

};

function converterParaObjetoJSON(jsonString) {
  return JSON.parse(jsonString);
}

function limpar() {
  cliente.cpf = 0;
  cliente.email = '';
  cliente.nome = '';
  cliente.endereco = '';
  cliente.bairro = '';
  cliente.telefone = '';
  cliente.celular = '';
  cliente.pendencias = '';
  cliente.senha = '';
}

function preencher(dados) {
  limpar();
  cliente.cpf = dados.cpf;
  cliente.email = dados.email;
  cliente.nome = dados.nome;
  cliente.endereco = dados.endereco;
  cliente.bairro = dados.bairro;
  cliente.telefone = dados.telefone;
  cliente.celular = dados.celular;
  cliente.pendencias = dados.pendencias;
  cliente.senha = dados.senha;
}

function limparLogin() {
  cliente.email = '';
  cliente.senha = '';
}

function preencherLogin(dados) {
  limpar();
  cliente.email = dados.email;
  cliente.senha = dados.senha;
}

module.exports = cliente;

// function criar() {
//
// }
//
// function editar() {
//
// }
//
// function visualizar () {
//   return cliente;
// }
//
// function fazerLogin () {
//   return cliente;
// }
