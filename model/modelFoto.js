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
    console.log(autonomo.nome + " em formato Obj JSON");
    sql.criarFoto(foto);
  },

  editar: function (entradaJSON) {
    console.log('Criado! ' + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    preencher(dadosJSON);
    console.log(autonomo.nome + " em formato Obj JSON");
    sql.editarFoto(foto);
  },

  visualizar: function (entradaJSON) {
    console.log(this.cpf);
    return this;
  },

  excluir: function (entradaJSON) {

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
