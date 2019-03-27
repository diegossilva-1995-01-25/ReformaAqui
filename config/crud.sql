-- INSERTS
INSERT INTO cliente (`cpf`, `email`, `nome`, `endereco`, `bairro`, `telefone`, `celular`, `pendencias`, `senha`)
  VALUES (?, ?, ?, ?, ?, ?, ?, FALSE, ?);
INSERT INTO autonomo (`cpf`, `email`, `nome`, `endereco`, `bairro`, `telefone`, `celular`, `funcaoPrimaria`,
  `outrasFuncoes`, `pendencias`, `senha`) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, FALSE, ?);
INSERT INTO recomendacao (`cpfCliente`, `cpfAutonomo`, `funcao`, `descricao`)
  VALUES (?, ?, ?, ?);
INSERT INTO solicitacaoOrcamento (`cpfCliente`, `cpfAutonomo`, `descricao`, `tipo`)
  VALUES (?, ?, ?, ?);
INSERT INTO orcamento (`idSolicitacao`, `cpfCliente`, `cpfAutonomo`, `descricao`, `tipo`, `preco`, `previsaoDias`, `situacao`)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?);
INSERT INTO avaliacao (`idOrcamento`, `numEstrelas`, `descricao`) VALUES (?, ?, ?);
INSERT INTO historico (`idOrcamento`, `descricao`, `atraso`, `numDiasAtraso`, `aumentoCusto`, `valorAcima`)
  VALUES (?, ?, ?, ?, ?, ?);
INSERT INTO foto (`idHistorico`, `image`, `descricao`) VALUES (?, ?, ?);


-- UPDATES
UPDATE cliente SET `cpf` = ?, `email` = ?, `nome` = ?, `endereco` = ?, `bairro` = ?, `telefone` = ?,
  `celular` = ?, `pendencias` = ?, `senha` = ? WHERE `cpf` = ?;
UPDATE autonomo SET `cpf` = ?, `email` = ?, `nome` = ?, `endereco` = ?, `bairro` = ?, `telefone` = ?,
  `celular` = ?, `pendencias` = ?, `senha` = ? WHERE `cpf` = ?;
UPDATE recomendacao SET `funcao` = ?, `descricao` = ? WHERE `idRecomendacao` = ?;
UPDATE solicitacaoOrcamento SET `descricao` = ?, `tipo` = ? WHERE `idSolicitacao` = ?;
UPDATE orcamento SET `descricao` = ?, `tipo` = ?, `preco` = ?, `previsaoDias` = ?, `situacao` = ?
  WHERE `idOrcamento` = ?;
UPDATE avaliacao SET `numEstrelas` = ?, `descricao` = ? WHERE `idAvaliacao` = ?;
UPDATE historico SET `descricao` = ?, `atraso` = ?, `numDiasAtraso` = ?, `aumentoCusto` = ?, `valorAcima` = ?
  WHERE `idHistorico` = ?;
UPDATE foto SET `image` = ?, `descricao` = ? WHERE `idFoto` = ?;


-- SELECTS
SELECT * FROM cliente;
SELECT * FROM autonomo;
SELECT * FROM recomendacao;
SELECT * FROM solicitacaoOrcamento;
SELECT * FROM orcamento;
SELECT * FROM avaliacao;
SELECT * FROM historico;
SELECT * FROM foto;


-- DELETES
DELETE FROM cliente WHERE cpf = ?;
DELETE FROM autonomo WHERE cpf = ?;
DELETE FROM recomendacao WHERE idRecomendacao = ?;
DELETE FROM solicitacaoOrcamento WHERE idSolicitacao = ?;
DELETE FROM orcamento WHERE idOrcamento = ?;
DELETE FROM avaliacao WHERE idAvaliacao = ?;
DELETE FROM historico WHERE idHistorico = ?;
DELETE FROM foto WHERE idFoto = ?;
