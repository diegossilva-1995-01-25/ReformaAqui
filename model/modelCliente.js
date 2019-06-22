const express = require('express');
const serveStatic = require('serve-static');
const app = express();
const request = require('request');
const path = require('path');
const Cookies = require('cookies');
var cookieSession = require('cookie-session');
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
    console.log(dadosJSON.nome + "conv");
    preencher(dadosJSON);
    console.log(cliente.nome + " em formato Obj JSON");
    sql.editarCliente(cliente);
  },

  visualizar: async function (entradaJSON) {
    var aux;

    entradaJSON = decodeURIComponent(entradaJSON);
    console.log("Encontrado " + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    console.log(dadosJSON.nome + " em formato Obj JSON");

    aux = await sql.consultarCliente(dadosJSON);

    console.log("Aux: " + aux); // 1

    aux = JSON.parse(aux);

    preencher(aux);

    return cliente;

  },

  fazerLogin: async function (entradaJSON) {
    var aux;
    console.log("Encontrado " + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    aux = await sql.consultarClienteEmail(dadosJSON);

    console.log("Aux: " + aux);

    aux = JSON.parse(aux);

    console.log(dadosJSON.senha + " e " + aux.senha);

    if (aux.senha == null) {
      return { "Erro": "Cliente não existe!" };

    } else if(dadosJSON.senha == aux.senha) {
      preencher(aux);
      console.log("Pre-Redirect: " + __dirname);

      return cliente;

    } else {
      console.log("Senha incorreta!");
      return "Senha incorreta!";
    }



    // Faça um app.route ou um request get para o homepage e estabeleça os cookies.
    // Não vai redirecionar (o routes faz isso) mas vai ter os cookies
    // Cosi: http://expressjs.com/en/4x/api.html#app.route
    //       https://www.twilio.com/blog/2017/08/http-requests-in-node-js.html

    // app.use(cookieSession({
    //   name: 'nome',
    //   keys: cookieNome,
    //
    //   // Cookie Options
    //   maxAge: 24 * 60 * 60 * 1000 // 24 hours
    // }));
    //
    // app.use(cookieSession({
    //   name: 'email',
    //   keys: cookieEmail,
    //
    //   // Cookie Options
    //   maxAge: 24 * 60 * 60 * 1000 // 24 hours
    // }));
    //
    // app.use(cookieSession({
    //   name: 'cpf',
    //   keys: cookieCPF,
    //
    //   // Cookie Options
    //   maxAge: 24 * 60 * 60 * 1000 // 24 hours
    // }));

    // request('http://localhost:3000/', function (request, response) { // Esse foi
    //
    //     var keys = ['keys'];
    //
    //     objetoCookies = new Cookies(request, response, { keys: keys });
    //
    //     objetoCookies.set('email', cookieEmail);
    //     objetoCookies.set('nome', cookieNome);
    //     objetoCookies.set('cpf', cookieCPF);
    //
    //     var demonst = objetoCookies.get('email');
    //
    //     console.log('Cookies criados! ' + demonst);
    //     // res.redirect(302, '');
    //   });

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

  if(dados.oldCpf != null) {
    cliente.oldCpf = dados.oldCpf;
  }

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
