var httpVerb = "";
var entityName = "";

function callEntity(verb, name, dadosEntrantes) {
  setHttpVerb(verb);
  setEntityName(name);
  const modelo = require(__dirname + '/../model/model' + entityName + '.js');

  if (name.includes("login")) {
    modelo.fazerLogin(dadosEntrantes);

  } else if (verb == "GET") {
    modelo.visualizar(dadosEntrantes);

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
