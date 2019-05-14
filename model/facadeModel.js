var httpVerb = "";
var entityName = "";

async function callEntity(verb, name, dadosEntrantes) {
  setHttpVerb(verb);
  setEntityName(name);
  const modelo = require(__dirname + '/../model/model' + entityName + '.js');
  var retorno;

  if (name.includes("login")) {
    retorno = await modelo.fazerLogin(dadosEntrantes);
    // console.log(retorno);
    return retorno;

  } else if (verb == "GET") {
    retorno = await modelo.visualizar(dadosEntrantes);
    return retorno;

  } else if (verb == "POST") {
    modelo.criar(dadosEntrantes);

  } else if (verb == "PUT") {
    modelo.editar(dadosEntrantes);

  } else if (verb == "DELETE") {
    modelo.excluir(dadosEntrantes);

  }

}

function setHttpVerb(verb) {
  httpVerb = verb;
}

function setEntityName(name) {

  if (name.includes("login")) {
    entityName = name.replace("login", "");
  } else {
    entityName = name;
  }

}

module.exports.callEntity = callEntity;
