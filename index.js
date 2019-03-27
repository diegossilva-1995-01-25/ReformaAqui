const http = require('http');
const fs = require('fs');
const path = require('path');
const routes = require('./config/routes.js');

const servidor = http.createServer(function (req, res) {
  console.log('NodeJS e ReformaAqui iniciados!');

  //res.writeHead(200, {'Content-Type': 'text/html'});
    var caminho = path.join(__dirname + './html/TelaLogin.html');
    fs.readFile(caminho, null, function(error, data) {
      if (error) {
        res.writeHead(404);
        res.write('File not found!' + caminho);
      } else {
        res.write(data);
        //res.write(caminho);
      }

      res.end();

  });
});
