var dadosJSON;
const sql = require('../config/sql');

var foto = {
  idFoto:         0,
  idHistorico:    0,
  imagem:        '',
  descricao:     '',

  criar: function (entradaJSON) {
    console.log('Criado! ' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(foto.imagem + " em formato Obj JSON");
    sql.criarFoto(foto);
  },

  editar: function (entradaJSON) {
    console.log('Editado! ' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(foto.imagem + " em formato Obj JSON");
    sql.editarFoto(foto);
  },

  visualizar: function (entradaJSON) {
    var aux;
    console.log("Encontrado " + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    console.log(dadosJSON.imagem + " em formato Obj JSON");

    sql.consultarClienteEmail(foto, function (retorno) {
      aux = retorno;
      dadosJSON = JSON.parse(aux);
      preencher(dadosJSON);
      aux = JSON.stringify(foto);
      cookie = JSON.parse(aux);
    });
  },

  excluir: function (entradaJSON) {
    console.log('Deletado! ' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(foto.imagem + " em formato Obj JSON");
    sql.excluirFoto(foto);
  }

};

function converterParaObjetoJSON(jsonString) {
  return JSON.parse(jsonString);
}

function limpar() {
  foto.idFoto = 0;
  foto.idHistorico = 0;
  foto.imagem = '';
  foto.descricao = '';
}

function preencher(dados) {
  limpar();
  foto.idFoto = dados.idFoto;
  foto.idHistorico = idHistorico;
  foto.imagem = dados.imagem;
  foto.descricao = dados.descricao;
}

module.exports = foto;

// function upload () {
//
// }
//
// function editar () {
//
// }
//
// function visualizar () {
//
// }
//
// function excluir () {
//
// }
