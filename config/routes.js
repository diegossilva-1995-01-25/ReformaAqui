// Faça os métodos com POST, PUT e DELETE
// Faça as chamadas para incluir o Façade de Controller e assim por diante
// Model liga com sql.js
// Tela para pesquisa de trabalhadores é necessária (index)
// Além da busca por si próprio no BD
// Que tudo venha como JSON e faça as tabelas na tela html (trabalhadores: por
// bairro, por especialidade, trabalhador de tal serviço e juntos), monte uma
// query conforme os filtros.
// JQuery para mudar de login de trabalhador e cliente conforme radio button.

const url = require('url');
const html = require('html');
const path = require('path');
const fs = require('fs');
const express = require('express');
const serveStatic = require('serve-static');
const app = express();
const bodyParser = require('body-parser');
const Cookies = require('cookies');
const request = require('request');

var caminho = '';
var dados = '';
var cabecalho, opcoes;
app.use(bodyParser.urlencoded({ extended: false }));

// GET
app.get("/", function (req, res) {
  usarEstaticos();
  caminho = path.join(__dirname + '/../html/index.html');
  lerHtml(caminho, req, res);
  //res.write(caminho);
});

app.get("/main", function (req, res) {
  usarEstaticos();
  caminho = path.join(__dirname + '/../html/index.html');
  lerHtml(caminho, req, res);
  //res.write(caminho);
});

app.get("/aceitarorcamento", function (req, res) {
  usarEstaticos();
  caminho = path.join(__dirname + '/../html/TelaAceitarOrcamento.html');
  lerHtml(caminho, req, res);
});

app.get("/avaliacao", function (req, res) {
  usarEstaticos();
  caminho = path.join(__dirname + '/../html/TelaAvaliacao.html');
  lerHtml(caminho, req, res);
});

app.get("/cliente", async function (req, res) {

  usarEstaticos();

  caminho = path.join(__dirname + '/../html/TelaCliente.html');
  lerHtml(caminho, req, res);

});

app.get("/cliente/:email", async function (req, res) { // app.get("/cliente/?", async function (req, res) { // : or *

  var retornado;
  var cookies = new Cookies(req, res);

  var cookieExiste = cookies.get('email');
  var controllers = require(__dirname + '/../controller/facadeController.js');

  var metOfReq = req.method;
  var reqUrl = req.originalUrl.split("/");
  reqUrl = reqUrl[1];

  console.log("end: " + reqUrl);

  // var c = req.cookies

  if (cookieExiste != null && cookieExiste != '') {
    var entJSON = { "cpf": cookies.get('cpf'), "email": cookies.get('email'), "nome": cookies.get('nome') };

    retornado = await controllers.callController(metOfReq, reqUrl.replace("/", ""), entJSON);

    // console.log("Ret: " + JSON.stringify(retornado));

    res.send(retornado);
    res.end();

  }

  // Fazer um get de cliente/email e orcamento/id

});

app.get("/autonomo/:email", async function (req, res) {

  var retornado;
  var cookies = new Cookies(req, res);

  var cookieExiste = cookies.get('email');
  var controllers = require(__dirname + '/../controller/facadeController.js');

  var metOfReq = req.method;
  var reqUrl = req.originalUrl.split("/");
  var check = reqUrl[2];
  reqUrl = reqUrl[1];


  console.log("end: " + reqUrl);

  // var c = req.cookies

  if (check == "all") {

    var ent = {"dados": "Todos"};

    retornado = await controllers.callController(metOfReq, reqUrl.replace("/", ""), ent);

    console.log("Ret: " + JSON.stringify(retornado));

    res.send(retornado);
    res.end();


  } else {

    if (cookieExiste != null && cookieExiste != '') {
      var entJSON = { "cpf": cookies.get('cpf'), "email": cookies.get('email'), "nome": cookies.get('nome') };

      retornado = await controllers.callController(metOfReq, reqUrl.replace("/", ""), entJSON);

      // console.log("Ret: " + JSON.stringify(retornado));

      res.send(retornado);
      res.end();

    }

  }
  // Fazer um get de cliente/email e orcamento/id

});

app.get("/comparar", function (req, res) {
  usarEstaticos();
  caminho = path.join(__dirname + '/../html/TelaCompararPrecos.html');
  lerHtml(caminho, req, res);
});

app.get("/foto", function (req, res) {
  usarEstaticos();
  caminho = path.join(__dirname + '/../html/TelaFoto.html');
  lerHtml(caminho, req, res);
});

app.get("/historico", function (req, res) {
  usarEstaticos();
  caminho = path.join(__dirname + '/../html/TelaHistorico.html');
  lerHtml(caminho, req, res);
});

app.get("/login", function (req, res) {
  usarEstaticos();
  caminho = path.join(__dirname + '/../html/TelaLogin.html');
  lerHtml(caminho, req, res);
});

app.get("/logoff", function (req, res) {
  usarEstaticos();

  res.clearCookie('email');
  res.clearCookie('cpf');
  res.clearCookie('nome');
  res.clearCookie('tipo');

  caminho = path.join(__dirname + '/../html/index.html');
  lerHtml(caminho, req, res);
});

app.get("/orcamento", function (req, res) {
  usarEstaticos();
  caminho = path.join(__dirname + '/../html/TelaOrcamento.html');
  lerHtml(caminho, req, res);
});

app.get("/recomendacao", function (req, res) {
  usarEstaticos();
  caminho = path.join(__dirname + '/../html/TelaRecomendacao.html');
  lerHtml(caminho, req, res);
});

app.get("/solicitacaoorcamento", function (req, res) {
  usarEstaticos();
  caminho = path.join(__dirname + '/../html/TelaSolicitarOrcamento.html');
  lerHtml(caminho, req, res);
});

app.get("/autonomo", function (req, res) {
  usarEstaticos();
  caminho = path.join(__dirname + '/../html/TelaAutonomo.html');
  lerHtml(caminho, req, res);
});

// POST
app.post("/cliente", function (req, res) {
  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  dados = req.body;
  console.log(req.body.cpf + " and " + req.body.nome);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  caminho = path.join(__dirname + '/../html/TelaLogin.html');
  lerHtml(caminho, req, res);
});

app.post("/cliente/:cpf", function (req, res) {

  var entrada, retornado;

  entrada = req.body;
  retornado = '';

  console.log("Entrada: " + JSON.stringify(entrada));

  var opcoes = {
      uri: 'http://localhost:3000/cliente',
      method: 'PUT',
      form: entrada
  };

  request(opcoes, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // Print out the response body
      console.log(body);
    } else {
      console.log("Erro:" + error);
    }
  });

  caminho = path.join(__dirname + '/../html/index.html');
  lerHtml(caminho, req, res);

});

app.post("/autonomo", function (req, res) {
  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  dados = req.body;
  console.log(req.body.cpf + " and " + req.body.nome);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  caminho = path.join(__dirname + '/../html/TelaLogin.html');
  lerHtml(caminho, req, res);
});

app.post("/autonomo/:cpf", function (req, res) {

  var entrada, retornado;

  entrada = req.body;
  retornado = '';

  console.log("Entrada: " + JSON.stringify(entrada));

  var opcoes = {
      uri: 'http://localhost:3000/autonomo',
      method: 'PUT',
      form: entrada
  };

  request(opcoes, function (error, response, body) {
    if (!error && response.statusCode == 200) {
      // Print out the response body
      console.log(body);
    } else {
      console.log("Erro:" + error);
    }
  });

  caminho = path.join(__dirname + '/../html/index.html');
  lerHtml(caminho, req, res);

});

app.post("/avaliacao", function (req, res) {
  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  caminho = path.join(__dirname + '/../html/index.html');
  lerHtml(caminho, req, res);
});

app.post("/aceitarorcamento", function (req, res) {
  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  caminho = path.join(__dirname + '/../html/index.html');
  lerHtml(caminho, req, res);
});

app.post("/foto", function (req, res) {
  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  caminho = path.join(__dirname + '/../html/index.html');
  lerHtml(caminho, req, res);
});

app.post("/historico", function (req, res) {
  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  caminho = path.join(__dirname + '/../html/index.html');
  lerHtml(caminho, req, res);
});

app.post("/login/cliente", async function (req, res) {
  var retornado;

  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl.substring(1);
  console.log(metOfReq + " and " + reqUrl);

  retornado = await controllers.callController(metOfReq, reqUrl.replace("/", ""), req.body);
  console.log(retornado);

  if(retornado != "Senha incorreta!") {
    res.cookie('cpf', retornado.cpf, {maxAge: 30 * 60 * 1000});
    res.cookie('nome', retornado.nome, {maxAge: 30 * 60 * 1000});
    res.cookie('email', retornado.email, {maxAge: 30 * 60 * 1000});
    res.cookie('tipo', 'cliente', {maxAge: 30 * 60 * 1000});
  }

  caminho = path.join(__dirname + '/../html/index.html');
  lerHtml(caminho, req, res);
});

app.post("/login/autonomo", async function (req, res) {
  var retornado;

  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl.substring(1);
  console.log(metOfReq + " and " + reqUrl);

  retornado = await controllers.callController(metOfReq, reqUrl.replace("/", ""), req.body);
  console.log(retornado);

  if(retornado != "Senha incorreta!" && retornado != "CPF incorreto!") {
    res.cookie('cpf', retornado.cpf, {maxAge: 30 * 60 * 1000});
    res.cookie('nome', retornado.nome, {maxAge: 30 * 60 * 1000});
    res.cookie('email', retornado.email, {maxAge: 30 * 60 * 1000});
    res.cookie('tipo', 'autonomo', {maxAge: 30 * 60 * 1000});
  }

  caminho = path.join(__dirname + '/../html/index.html');
  lerHtml(caminho, req, res);
});

app.post("/orcamento", function (req, res) {
  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  caminho = path.join(__dirname + '/../html/index.html');
  lerHtml(caminho, req, res);
});

app.post("/recomendacao", function (req, res) {
  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  caminho = path.join(__dirname + '/../html/index.html');
  lerHtml(caminho, req, res);
});

app.post("/solicitacaoorcamento", function (req, res) {
  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  caminho = path.join(__dirname + '/../html/index.html');
  lerHtml(caminho, req, res);
});

app.post("/comparar", function (req, res) {
  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  caminho = path.join(__dirname + '/../html/index.html');
  lerHtml(caminho, req, res);
});

// PUT
app.put("/avaliacao", function (req, res) {
  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  // caminho = path.join(__dirname + '/../html/index.html');
  // lerHtml(caminho, req, res);
});

app.put("/foto", function (req, res) {
  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  // caminho = path.join(__dirname + '/../html/index.html');
  // lerHtml(caminho, req, res);
});

app.put("/historico", function (req, res) {
  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  // caminho = path.join(__dirname + '/../html/index.html');
  // lerHtml(caminho, req, res);
});

app.put("/orcamento", function (req, res) {
  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  // caminho = path.join(__dirname + '/../html/index.html');
  // lerHtml(caminho, req, res);
});

app.put("/recomendacao", function (req, res) {
  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  // caminho = path.join(__dirname + '/../html/index.html');
  // lerHtml(caminho, req, res);
});

app.put("/solicitacaoorcamento", function (req, res) {
  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  // caminho = path.join(__dirname + '/../html/index.html');
  // lerHtml(caminho, req, res);
});

app.put("/cliente", function (req, res) {
  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  console.log("PUT: " + JSON.stringify(req.body));
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  // caminho = path.join(__dirname + '/../html/index.html');
  // lerHtml(caminho, req, res);
});

app.put("/autonomo", function (req, res) {
  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  // caminho = path.join(__dirname + '/../html/index.html');
  // lerHtml(caminho, req, res);
});

// DELETE
app.delete("/foto", function (req, res) {
  usarEstaticos();
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  // caminho = path.join(__dirname + '/../html/index.html');
  // lerHtml(caminho, req, res);
});

// Utilidades
function lerHtml(rota, req, res) {

  fs.readFile(rota, null, function(err, html) {
		res.writeHeader(200, {'Content-Type': 'text/html, charset=utf-8'});
		res.end(html);
	});

}

function usarEstaticos() {
  app.use(express.static('./'));
}

app.listen(3000, function () {
  console.log('Ouvindo a porta 3000');
});

module.exports = app;
