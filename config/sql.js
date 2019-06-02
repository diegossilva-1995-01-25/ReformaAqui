const mysql = require('mysql');
var comando = '';

const pool = mysql.createPool({
  connectionLimit:      10,
  host:        "localhost",
  user:            "diego",
  password: "MrDiego556!!",
  database:  "reformaaqui"
});

// Desnecessário por usar pool de conexõa
//
// function conectar() {
//   con.connect(function (err) {
//     if (err) throw err;
//     console.log("Conectado ao MySQL!");
//   });
// }
//
// function desconectar() {
//   con.end(function (err) {
//     if (err) throw err;
//     console.log("Desconectado do MySQL!");
//   });
// }

// Duas formas de se proteger de SQLinjection com npm-mysql:
//
//// Um conection.escape() para cada campo
// var sql = 'SELECT * FROM users WHERE id = ' + connection.escape(userId);
// connection.query(sql, function (error, results, fields) {
// if (error) throw error;
//  ...
// });
//
// OU
//
// connection.query('SELECT * FROM users WHERE id = ?', [userId], function (error, results, fields) {
// if (error) throw error;
//  ...
// });

var crud = {

  criarAutonomo: function (dadosDeEntrada) {

    pool.getConnection(function(err, con) {
      if (err) throw err; // not connected!

      comando = "INSERT INTO autonomo (`cpf`, `email`, `nome`, `endereco`, `bairro`, `telefone`, `celular`, `funcaoPrimaria`, " +
        "`outrasFuncoes`, `pendencias`, `senha`) VALUES (" + con.escape(dadosDeEntrada.cpf) + ", " + con.escape(dadosDeEntrada.email) +
        ", " + con.escape(dadosDeEntrada.nome) + ", " + con.escape(dadosDeEntrada.endereco) + ", " + con.escape(dadosDeEntrada.bairro) +
        ", " + con.escape(dadosDeEntrada.telefone) + ", " + con.escape(dadosDeEntrada.celular) + ", " + con.escape(dadosDeEntrada.funcaoPrimaria) +
        ", " + con.escape(dadosDeEntrada.outrasFuncoes) + ", FALSE, " + con.escape(dadosDeEntrada.senha) + ")";

      con.query(comando, function (error, results, fields) {
        if (error) throw error;
        console.log("Autônomo criado!");
        con.release();

        // Handle error after the release.
        if (error) throw error;

      });

    });

  },

  editarAutonomo: function (dadosDeEntrada) {

    pool.getConnection(function(err, con) {
      if (err) throw err; // not connected!

      comando = "UPDATE autonomo SET `cpf` = " + con.escape(dadosDeEntrada.cpf) + ", `email` = " + con.escape(dadosDeEntrada.email) +
        ", `nome` = " + con.escape(dadosDeEntrada.nome) + ", `endereco` = " + con.escape(dadosDeEntrada.endereco) +
        ", `bairro` = " + con.escape(dadosDeEntrada.bairro) + ", `telefone` = " + con.escape(dadosDeEntrada.telefone) + ", " +
        "`celular` = " + con.escape(dadosDeEntrada.celular) + ", `pendencias` = FALSE, `senha` = " + con.escape(dadosDeEntrada.senha) +
        " WHERE `cpf` = " + con.escape(dadosDeEntrada.oldCpf);

      con.query(comando, function (error, results, fields) {
        if (error) throw error;
        console.log("Autônomo alterado!");
        con.release();

        // Handle error after the release.
        if (error) throw error;

      });

    });

  },

  consultarAutonomo: async function (dadosDeEntrada) {

    var resultSet = JSON.stringify("{}");

    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, con) {
        if (err) return reject(err); // not connected!

        comando = "SELECT * FROM autonomo WHERE cpf = "  + con.escape(dadosDeEntrada.cpf);

        con.query(comando, function (error, results, fields) {
          if (error) throw error;
          console.log("Autônomo consultado!");

          if (results.length) {
            resultSet = JSON.stringify(results[0]);
          } else {
            resultSet = JSON.stringify({"Erro": "Não existe este registro."});
          }

          con.release();

          return resolve(resultSet);

        });

      });
    });


  },

  consultarAutonomoCPFeEmail: async function (dadosDeEntrada) {

    var resultSet = JSON.stringify("{}");

    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, con) {
        if (err) return reject(err); // not connected!

        comando = "SELECT * FROM autonomo WHERE cpf = "  + con.escape(decodeURIComponent(dadosDeEntrada.cpf)) +
          " AND email = " + con.escape(decodeURIComponent(dadosDeEntrada.email));

        con.query(comando, function (error, results, fields) {
          if (error) throw error;
          console.log("Autônomo consultado!");

          if (results.length) {
            resultSet = JSON.stringify(results[0]);
            console.log(resultSet);
          } else {
            resultSet = JSON.stringify({"Erro": "Não existe este registro."});
          }


          con.release();

          return resolve(resultSet);

        });

      });
    });



  },

  consultarAutonomos: async function () {

    var resultSet = JSON.stringify("{}");

	  return new Promise((resolve, reject) => {
      pool.getConnection(function(err, con) {
        if (err) return reject(err); // not connected!

        comando = "SELECT * FROM autonomo";

        con.query(comando, function (error, results, fields) {
          if (error) throw error;
          console.log("Todos os autônomos!");

          if (results.length) {
            resultSet = JSON.stringify(results);

          } else {
            resultSet = JSON.stringify({"Erro": "Não existem registros."});
          }

          con.release();

          return resolve(resultSet);

        });

      });
    });



  },

  criarAvaliacao: function (dadosDeEntrada) {

    pool.getConnection(function(err, con) {
      if (err) throw err; // not connected!

      comando = "INSERT INTO avaliacao (`idOrcamento`, `numEstrelas`, `descricao`) VALUES (" +
        con.escape(dadosDeEntrada.idOrcamento) + ", " + con.escape(dadosDeEntrada.numEstrelas) +
        ", " + con.escape(dadosDeEntrada.descricao) + ")";

      con.query(comando, function (error, results, fields) {
        if (error) throw error;
        console.log("Avaliação criada!");
        con.release();

        // Handle error after the release.
        if (error) throw error;
      });

    });

  },

  editarAvaliacao: function (dadosDeEntrada) {

    pool.getConnection(function(err, con) {
      if (err) throw err; // not connected!

      comando = "UPDATE avaliacao SET `numEstrelas` = " + con.escape(dadosDeEntrada.numEstrelas) +
        ", `descricao` = " + con.escape(dadosDeEntrada.descricao) +
        " WHERE `idAvaliacao` = " + con.escape(dadosDeEntrada.idAvaliacao);

      con.query(comando, function (error, results, fields) {
        if (error) throw error;
        console.log("Avaliação alterada!");
        con.release();

        // Handle error after the release.
        if (error) throw error;
      });

    });

  },

  consultarAvaliacao: async function (dadosDeEntrada) {

    var resultSet = JSON.stringify("{}");

    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, con) {
        if (err) return reject(err); // not connected!

        comando = "SELECT * FROM avaliacao WHERE `idAvaliacao` = " + con.escape(dadosDeEntrada.idAvaliacao);

        con.query(comando, function (error, results, fields) {
          if (error) throw error;
          console.log("Avaliação consultada!");

          if (results.length) {
            resultSet = JSON.stringify(results[0]);
          } else {
            resultSet = JSON.stringify({"Erro": "Não existe este registro."});
          }

          con.release();

          return resolve(resultSet);

        });

      });
    });

  },

  consultarAvaliacoes: async function () {

    var resultSet = JSON.stringify("{}");

	  return new Promise((resolve, reject) => {
      pool.getConnection(function(err, con) {
        if (err) throw err; // not connected!

        comando = "SELECT * FROM avaliacao";

        con.query(comando, function (error, results, fields) {
          if (error) throw error;
          console.log("Todas as avaliações!");

          if (results.length) {
            resultSet = JSON.stringify(results);

          } else {
            resultSet = JSON.stringify({"Erro": "Não existem registros."});
          }

          con.release();

          return resolve(resultSet);

        });

      });
    });

  },

  criarCliente: function (dadosDeEntrada) {

    pool.getConnection(function(err, con) {
      if (err) throw err; // not connected!

      comando = "INSERT INTO cliente (`cpf`, `email`, `nome`, `endereco`, `bairro`, `telefone`, `celular`, `pendencias`, `senha`) " +
        "VALUES (" + con.escape(dadosDeEntrada.cpf) + ", " + con.escape(dadosDeEntrada.email) + ", " + con.escape(dadosDeEntrada.nome) +
        ", " + con.escape(dadosDeEntrada.endereco) + ", " + con.escape(dadosDeEntrada.bairro) + ", " + con.escape(dadosDeEntrada.telefone) +
        ", " + con.escape(dadosDeEntrada.celular) + ", FALSE, " + con.escape(dadosDeEntrada.senha) + ")";

      con.query(comando, function (error, results, fields) {
        if (error) throw error;
        console.log("Cliente criado!");
        con.release();

        // Handle error after the release.
        if (error) throw error;
      });

    });

  },

  editarCliente: function (dadosDeEntrada) {

    pool.getConnection(function(err, con) {
      if (err) throw err; // not connected!

      comando = "UPDATE cliente SET `cpf` = " + con.escape(dadosDeEntrada.cpf) + ", `email` = " + con.escape(dadosDeEntrada.email) +
        ", `nome` = " + con.escape(dadosDeEntrada.nome) + ", `endereco` = " + con.escape(dadosDeEntrada.endereco) +
        ", `bairro` = " + con.escape(dadosDeEntrada.bairro) + ", `telefone` = " + con.escape(dadosDeEntrada.telefone) + ", " +
        "`celular` = " + con.escape(dadosDeEntrada.celular) + ", `pendencias` = FALSE, `senha` = " + con.escape(dadosDeEntrada.senha) +
        " WHERE `cpf` = "  + con.escape(dadosDeEntrada.oldCpf);

      con.query(comando, function (error, results, fields) {
        if (error) throw error;
        console.log("Cliente alterado!");
        con.release();

        // Handle error after the release.
        if (error) throw error;
      });

    });

  },

  consultarCliente: async function (dadosDeEntrada) {

    var resultSet = JSON.stringify("{}");

    return new Promise((resolve, reject) => {
      pool.getConnection(function(err, con) {
        if (err) return reject(err); // not connected!

        comando = "SELECT * FROM cliente WHERE cpf = " + con.escape(dadosDeEntrada.cpf);

        con.query(comando, function (error, results, fields) {
          if (error) throw error;

          if (results.length) {
            resultSet = JSON.stringify(results[0]);
          } else {
            resultSet = JSON.stringify({"Erro": "Não existe este registro."});
          }

          con.release();

          return resolve(resultSet);

        });

      });
    });

  },

  consultarClienteEmail: async function (dadosDeEntrada) { //, callback) {

    var resultSet = JSON.stringify("{}");

    return new Promise((resolve, reject) => {

      pool.getConnection(function(err, con) {
      if (err) return reject(err); // not connected!

      comando = "SELECT * FROM cliente WHERE email = " + con.escape(decodeURIComponent(dadosDeEntrada.email));

      console.log(encodeURIComponent(dadosDeEntrada.email));

      // Problema aqui, por que o callback não preenche o resultSet?
      con.query(comando, function (error, results, fields) {
        if (error) return reject(error);
        // console.log("Cliente consultado!");
        if (results.length != 0) {
          resultSet = JSON.stringify(results[0]);
        } else {
          resultSet = JSON.stringify({"Erro": "Não existe este registro."});
          console.log(resultSet);
        }

        console.log("Do SQL:" + resultSet); // 3

        con.release();

        console.log("Do ResultSet Retornado: " + resultSet); // 2
        return resolve(resultSet);

      });
    });
  });
},

  criarFoto: function (dadosDeEntrada) {

    pool.getConnection(function(err, con) {
      if (err) throw err; // not connected!

      comando = "INSERT INTO foto (`idHistorico`, `image`, `descricao`) VALUES (" + con.escape(dadosDeEntrada.idHistorico) +
        ", " + con.escape(dadosDeEntrada.imagem) + ", " + con.escape(dadosDeEntrada.descricao) + ")";

      con.query(comando, function (error, results, fields) {
        if (error) throw error;
        console.log("Foto criada!");
        con.release();

        // Handle error after the release.
        if (error) throw error;
      });

    });

  },

  editarFoto: function (dadosDeEntrada) {

    pool.getConnection(function(err, con) {
      if (err) throw err; // not connected!

      comando = "UPDATE foto SET `image` = " + con.escape(dadosDeEntrada.imagem) +
        ", `descricao` = " + con.escape(dadosDeEntrada.descricao) + " WHERE `idFoto` = " + con.escape(dadosDeEntrada.idFoto);

      con.query(comando, function (error, results, fields) {
        if (error) throw error;
        console.log("Foto alterada!");
        con.release();

        // Handle error after the release.
        if (error) throw error;
      });

    });

  },

  consultarFoto: async function (dadosDeEntrada) {

    var resultSet = JSON.stringify("{}");

	  return new Promise((resolve, reject) => {
      pool.getConnection(function(err, con) {
        if (err) return reject(err); // not connected!

        comando = "SELECT * FROM foto WHERE `idFoto` = " + con.escape(dadosDeEntrada.idFoto);

        con.query(comando, function (error, results, fields) {
          if (error) throw error;
          console.log("Foto consultada!");

          if (results.length) {
            resultSet = JSON.stringify(results[0]);

          } else {
            resultSet = JSON.stringify({"Erro": "Não existe este registro."});

          }

          con.release();

          return resolve(resultSet);

        });

      });
    });

  },

  excluirFoto: function (dadosDeEntrada) {

    pool.getConnection(function(err, con) {
      if (err) throw err; // not connected!

      comando = "DELETE FROM foto WHERE `idFoto` = " + con.escape(dadosDeEntrada.idFoto);

      con.query(comando, function (error, results, fields) {
        if (error) throw error;
        console.log("Foto deletada!");
        con.release();

        // Handle error after the release.
        if (error) throw error;
      });

    });

  },

  consultarFotos: async function () {

    var resultSet = JSON.stringify("{}");

	  return new Promise((resolve, reject) => {
      pool.getConnection(function(err, con) {
        if (err) throw err; // not connected!

        comando = "SELECT * FROM foto";

        con.query(comando, function (error, results, fields) {
          if (error) throw error;
          console.log("Todas as fotos!");

          if (results.length) {
            resultSet = JSON.stringify(results);

          } else {
            resultSet = JSON.stringify({"Erro": "Não existem registros."});
          }

          con.release();

          return resolve(resultSet);

        });

      });
    });

  },

  criarHistorico: function (dadosDeEntrada) {

    pool.getConnection(function(err, con) {
      if (err) throw err; // not connected!

      comando = "INSERT INTO historico (`idOrcamento`, `descricao`, `atraso`, `numDiasAtraso`, `aumentoCusto`, `valorAcima`) " +
        "VALUES (" + con.escape(dadosDeEntrada.idOrcamento) + ", " + con.escape(dadosDeEntrada.descricao) + ", " +
        con.escape(dadosDeEntrada.atraso) + ", " + con.escape(dadosDeEntrada.numDiasAtraso) + ", " +
        con.escape(dadosDeEntrada.aumentoCusto) + ", " + con.escape(dadosDeEntrada.valorAcima) + ")";

      con.query(comando, function (error, results, fields) {
        if (error) throw error;
        console.log("Histórico criado!");
        con.release();

        // Handle error after the release.
        if (error) throw error;
      });

    });

  },

  editarHistorico: function (dadosDeEntrada) {

    pool.getConnection(function(err, con) {
      if (err) throw err; // not connected!

      comando = "UPDATE historico SET `descricao` = " + con.escape(dadosDeEntrada.descricao) +
        ", `atraso` = " + con.escape(dadosDeEntrada.atraso) + ", `numDiasAtraso` = " + con.escape(dadosDeEntrada.numDiasAtraso) +
        ", `aumentoCusto` = " + con.escape(dadosDeEntrada.aumentoCusto) + ", `valorAcima` = " + con.escape(dadosDeEntrada.valorAcima) +
        " " + "WHERE `idHistorico` = "  + con.escape(dadosDeEntrada.idHistorico);

      con.query(comando, function (error, results, fields) {
        if (error) throw error;
        console.log("Histórico alterado!");
        con.release();

        // Handle error after the release.
        if (error) throw error;
      });

    });

  },

  consultarHistorico: async function (dadosDeEntrada) {

    var resultSet = JSON.stringify("{}");

	  return new Promise((resolve, reject) => {
      pool.getConnection(function(err, con) {
        if (err) return reject(err); // not connected!

        comando = "SELECT * FROM historico WHERE `idHistorico` = " + con.escape(dadosDeEntrada.idHistorico);

        con.query(comando, function (error, results, fields) {
          if (error) throw error;
          console.log("Histórico consultado!");

          if (results.length) {
            resultSet = JSON.stringify(results[0]);
          } else {
            resultSet = JSON.stringify({"Erro": "Não existe este registro."});
          }

          con.release();

          return resolve(resultSet);

        });

      });
    });



  },

  consultarHistoricos: async function () {

    var resultSet = JSON.stringify("{}");

	  return new Promise((resolve, reject) => {
      pool.getConnection(function(err, con) {
        if (err) throw err; // not connected!

        comando = "SELECT * FROM historico";

        con.query(comando, function (error, results, fields) {
          if (error) throw error;
          console.log("Todos os históricos!");

          var iterador = 0

          if (results.length) {
            resultSet = JSON.stringify(results);

          } else {
            resultSet = JSON.stringify({"Erro": "Não existem registros."});
          }

          con.release();

          return resolve(resultSet);

        });

      });
    });

  },

  criarOrcamento: function (dadosDeEntrada) {

    pool.getConnection(function(err, con) {
      if (err) throw err; // not connected!

      comando = "INSERT INTO orcamento (`idSolicitacao`, `cpfCliente`, `cpfAutonomo`, `descricao`, `tipo`, `preco`, " +
        "`previsaoDias`, `situacao`) VALUES (" + con.escape(dadosDeEntrada.idSolicitacao) + ", " + con.escape(dadosDeEntrada.cpfCliente) +
        ", " + con.escape(dadosDeEntrada.cpfAutonomo) + ", " + con.escape(dadosDeEntrada.descricao) +
        ", " + con.escape(dadosDeEntrada.tipo) + ", " + con.escape(dadosDeEntrada.preco) + ", " + con.escape(dadosDeEntrada.previsaoDias) +
        ", " + con.escape(dadosDeEntrada.situacao) + ")";

      con.query(comando, function (error, results, fields) {
        if (error) throw error;
        console.log("Orçamento criado!");
        con.release();

        // Handle error after the release.
        if (error) throw error;
      });

    });

  },

  editarOrcamento: function (dadosDeEntrada) {

    pool.getConnection(function(err, con) {
      if (err) throw err; // not connected!

      comando = "UPDATE orcamento SET `descricao` = " + con.escape(dadosDeEntrada.descricao) +
        ", `tipo` = " + con.escape(dadosDeEntrada.tipo) + ", `preco` = " + con.escape(dadosDeEntrada.preco) +
        ", `previsaoDias` = " + con.escape(dadosDeEntrada.previsaoDias) + ", `situacao` = " + con.escape(dadosDeEntrada.situacao) +
        " " + "WHERE `idOrcamento` = " + con.escape(dadosDeEntrada.idOrcamento);

      con.query(comando, function (error, results, fields) {
        if (error) throw error;
        console.log("Orçamento alterado!");
        con.release();

        // Handle error after the release.
        if (error) throw error;
      });

    });

  },

  consultarOrcamento: async function (dadosDeEntrada) {

    var resultSet = JSON.stringify("{}");

	  return new Promise((resolve, reject) => {
      pool.getConnection(function(err, con) {
        if (err) throw err; // not connected!

        comando = "SELECT * FROM orcamento WHERE `idOrcamento` = " + con.escape(dadosDeEntrada.idOrcamento);

        con.query(comando, function (error, results, fields) {
          if (error) throw error;
          console.log("Orçamento consultado!");

          if (results.length) {
            resultSet = JSON.stringify(results[0]);
          } else {
            resultSet = JSON.stringify({"Erro": "Não existe este registro."});
          }

          con.release();

          return resolve(resultSet);

        });

      });
    });

  },

  consultarOrcamentos: async function () {

    var resultSet = JSON.stringify("{}");

	  return new Promise((resolve, reject) => {
      pool.getConnection(function(err, con) {
        if (err) throw err; // not connected!

        comando = "SELECT * FROM orcamento";

        con.query(comando, function (error, results, fields) {
          if (error) throw error;
          console.log("Todos os orçamentos!");

          if (results.length) {
            resultSet = JSON.stringify(results);

          } else {
            resultSet = JSON.stringify({"Erro": "Não existem registros."});
          }

          con.release();

          return resolve(resultSet);

        });

      });
    });

  },

  criarRecomendacao: function (dadosDeEntrada) {

    pool.getConnection(function(err, con) {
      if (err) throw err; // not connected!

      comando = "INSERT INTO recomendacao (`cpfCliente`, `cpfAutonomo`, `funcao`, `descricao`) VALUES (" +
        con.escape(dadosDeEntrada.cpfCliente) + ", " + con.escape(dadosDeEntrada.cpfAutonomo) + ", " +
        con.escape(dadosDeEntrada.funcao) + ", " + con.escape(dadosDeEntrada.descricao) + ")";

      con.query(comando, function (error, results, fields) {
        if (error) throw error;
        console.log("Recomendação criada!");
        con.release();

        // Handle error after the release.
        if (error) throw error;
      });

    });

  },

  editarRecomendacao: function (dadosDeEntrada) {

    pool.getConnection(function(err, con) {
      if (err) throw err; // not connected!

      comando = "UPDATE recomendacao SET `funcao` = " + con.escape(dadosDeEntrada.funcao) +
        ", `descricao` = " + con.escape(dadosDeEntrada.descricao) +
        " WHERE `idRecomendacao` = " + con.escape(dadosDeEntrada.idRecomendacao);

      con.query(comando, function (error, results, fields) {
        if (error) throw error;
        console.log("Recomendação alterada!");
        con.release();

        // Handle error after the release.
        if (error) throw error;
      });

    });

  },

  consultarRecomendacao: async function (dadosDeEntrada) {

    var resultSet = JSON.stringify("{}");

	  return new Promise((resolve, reject) => {
      pool.getConnection(function(err, con) {
        if (err) throw err; // not connected!

        comando = "SELECT * FROM recomendacao WHERE `idRecomendacao` = " + con.escape(dadosDeEntrada.idRecomendacao);

        con.query(comando, function (error, results, fields) {
          if (error) throw error;
          console.log("Recomendação consultada!");

          if (results.length) {
            resultSet = JSON.stringify(results[0]);
          } else {
            resultSet = JSON.stringify( {"Erro": "Não existe este registro."} );
          }

          con.release();

          return resolve(resultSet);

        });

      });
    });

  },

  consultarRecomendacoes: async function () {

    var resultSet = JSON.stringify("{}");

	  return new Promise((resolve, reject) => {
      pool.getConnection(function(err, con) {
        if (err) throw err; // not connected!

        comando = "SELECT * FROM recomendacao";

        con.query(comando, function (error, results, fields) {
          if (error) throw error;
          console.log("Todas as recomendações!");

          if (results.length) {
            resultSet = JSON.stringify(results);
          } else {
            resultSet = JSON.stringify({"Erro": "Não existem registros."});
          }

          con.release();

          return resolve(resultSet);

        });

      });
    });

  },

  criarSolicitacaoOrcamento: function (dadosDeEntrada) {

    pool.getConnection(function(err, con) {
      if (err) throw err; // not connected!

      comando = "INSERT INTO solicitacaoOrcamento (`cpfCliente`, `cpfAutonomo`, `descricao`, `tipo`) " +
        "VALUES (" + con.escape(dadosDeEntrada.cpfCliente) + ", " + con.escape(dadosDeEntrada.cpfAutonomo) + ", " +
        con.escape(dadosDeEntrada.descricao) + ", " + con.escape(dadosDeEntrada.tipo) + ")";

      con.query(comando, function (error, results, fields) {
        if (error) throw error;
        console.log("Solicitação criada!");
        con.release();

        // Handle error after the release.
        if (error) throw error;
      });

    });

  },

  editarSolicitacaoOrcamento: function (dadosDeEntrada) {

    pool.getConnection(function(err, con) {
      if (err) throw err; // not connected!

      comando = "UPDATE solicitacaoOrcamento SET `descricao` = " + con.escape(dadosDeEntrada.descricao) +
        ", `tipo` = " + con.escape(dadosDeEntrada.tipo) + " WHERE `idSolicitacao` = " + con.escape(dadosDeEntrada.idSolicitacao);

      con.query(comando, function (error, results, fields) {
        if (error) throw error;
        console.log("Solicitação alterada!");
        con.release();

        // Handle error after the release.
        if (error) throw error;
      });

    });

  },

  consultarSolicitacaoOrcamento: async function (dadosDeEntrada) {

    var resultSet = JSON.stringify("{}");

	  return new Promise((resolve, reject) => {
      pool.getConnection(function(err, con) {
        if (err) throw err; // not connected!

        comando = "SELECT * FROM solicitacaoOrcamento WHERE `idSolicitacao` = " + con.escape(dadosDeEntrada.idSolicitacao);

        con.query(comando, function (error, results, fields) {
          if (error) throw error;
          console.log("Solicitação consultada!");

          if (results.length) {
            resultSet = JSON.stringify(results[0]);
          } else {
            resultSet = JSON.stringify( {"Erro": "Não existe este registro."} );
          }

          con.release();

          return resolve(resultSet);

        });

      });
    });

  },

  consultarSolicitacoesOrcamentos: async function (dadosDeEntrada) {

    var resultSet = JSON.stringify("{}");

	  return new Promise((resolve, reject) => {
      pool.getConnection(function(err, con) {
        if (err) throw err; // not connected!

        comando = "SELECT `idSolicitacao`, `nome`, `bairro`, `tipo`, `descricao` FROM solicitacaoOrcamento " +
          "INNER JOIN cliente ON solicitacaoOrcamento.cpfCliente = cliente.cpf" +
          " WHERE `cpfAutonomo` = " + con.escape(dadosDeEntrada.cpfAutonomo);

        con.query(comando, function (error, results, fields) {
          if (error) throw error;
          console.log("Todas as solicitações!");

          if (results.length) {
            resultSet = JSON.stringify(results);
          } else {
            resultSet = JSON.stringify( {"Erro": "Não existem registros."} );
          }

          con.release();

          return resolve(resultSet);

        });

      });
    });

  }

};

// module.exports = pool;
module.exports = crud;

// Ao invés de if, nos que tem resultSet com n linhas, faça laço de repetição e push em vetor
// E dê um jeito de chamar no html de tela
