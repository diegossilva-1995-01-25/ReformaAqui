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

var caminho = '';
var dados = '';
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

app.get("/cliente", function (req, res) {
  usarEstaticos();
  caminho = path.join(__dirname + '/../html/TelaCliente.html');
  lerHtml(caminho, req, res);
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
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  dados = req.body;
  console.log(req.body.cpf + " and " + req.body.nome);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  res.end();
});

app.post("/autonomo", function (req, res) {
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  dados = req.body;
  console.log(req.body.cpf + " and " + req.body.nome);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  res.end();
});

app.post("/avaliacao", function (req, res) {
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  res.end();
});

app.post("/aceitarorcamento", function (req, res) {
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  res.end();
});

app.post("/foto", function (req, res) {
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  res.end();
});

app.post("/historico", function (req, res) {
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  res.end();
});

app.post("/login/cliente", function (req, res) {
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl.substring(1);
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.replace("/", ""), req.body);
  res.end();
});

app.post("/login/autonomo", function (req, res) {
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl.substring(1);
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.replace("/", ""), req.body);
  res.end();
});

app.post("/orcamento", function (req, res) {
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  res.end();
});

app.post("/recomendacao", function (req, res) {
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  res.end();
});

app.post("/solicitacaoorcamento", function (req, res) {
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  res.end();
});

app.post("/comparar", function (req, res) {
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  res.end();
});

// PUT
app.put("/avaliacao", function (req, res) {
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  res.end();
});

app.put("/foto", function (req, res) {
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  res.end();
});

app.put("/historico", function (req, res) {
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  res.end();
});

app.put("/orcamento", function (req, res) {
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  res.end();
});

app.put("/recomendacao", function (req, res) {
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  res.end();
});

app.put("/solicitacaoorcamento", function (req, res) {
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  res.end();
});

app.put("/cliente", function (req, res) {
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  res.end();
});

app.put("/autonomo", function (req, res) {
  var controllers = require(__dirname + '/../controller/facadeController.js');
  var metOfReq = req.method;
  var reqUrl = req.originalUrl;
  console.log(metOfReq + " and " + reqUrl);
  controllers.callController(metOfReq, reqUrl.substring(1), req.body);
  res.end();
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
  // app.use(express.static('/../html/css/'));
}

app.listen(3000, function () {
  console.log('Ouvindo a porta 3000');
});

module.exports = app;
