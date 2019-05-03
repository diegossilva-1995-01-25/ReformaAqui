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

  visualizar: async function (entradaJSON) {
    var aux;
    console.log("Encontrado " + entradaJSON);
    dadosJSON = converterParaObjetoJSON(entradaJSON);
    console.log(dadosJSON.nome + " em formato Obj JSON");

    aux = await sql.consultarFoto(dadosJSON);

    console.log("Aux: " + aux); // 1

    aux = JSON.parse(aux);

    preencher(aux);

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
