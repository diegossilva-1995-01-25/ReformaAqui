CREATE DATABASE IF NOT EXISTS reformaAqui;

CREATE TABLE IF NOT EXISTS `reformaaqui`.`cliente` (
  `cpf` VARCHAR(15) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `endereco` VARCHAR(100) NOT NULL,
  `bairro` VARCHAR(50) NOT NULL,
  `telefone` VARCHAR(25) NOT NULL,
  `celular` VARCHAR(25) NOT NULL,
  `pendencias` VARCHAR(5) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`cpf`),
  INDEX `nome` (`nome` ASC) INVISIBLE,
  INDEX `bairro` (`bairro` ASC) INVISIBLE);

CREATE TABLE IF NOT EXISTS `reformaaqui`.`autonomo` (
  `cpf` VARCHAR(15) NOT NULL,
  `email` VARCHAR(100) NOT NULL,
  `nome` VARCHAR(100) NOT NULL,
  `endereco` VARCHAR(100) NOT NULL,
  `bairro` VARCHAR(50) NOT NULL,
  `telefone` VARCHAR(25) NOT NULL,
  `celular` VARCHAR(25) NOT NULL,
  `funcaoPrimaria` VARCHAR(25) NOT NULL,
  `outrasFuncoes` VARCHAR(255),
  `pendencias` VARCHAR(5) NOT NULL,
  `senha` VARCHAR(100) NOT NULL,
  PRIMARY KEY (`cpf`),
  INDEX `nome` (`nome` ASC) INVISIBLE,
  INDEX `bairro` (`bairro` ASC) INVISIBLE,
  INDEX `funcaoPrimaria` (`funcaoPrimaria` ASC) INVISIBLE);

CREATE TABLE IF NOT EXISTS `reformaaqui`.`recomendacao` (
  `idRecomendacao` INT NOT NULL AUTO_INCREMENT,
  `cpfCliente` VARCHAR(15) NOT NULL,
  `cpfAutonomo` VARCHAR(15) NOT NULL,
  `funcao` VARCHAR(25) NOT NULL,
  `descricao` VARCHAR(255) NULL,
  PRIMARY KEY (`idRecomendacao`),
  INDEX `cpfCliente` (`cpfCliente` ASC) INVISIBLE,
  INDEX `cpfAutonomo` (`cpfAutonomo` ASC) INVISIBLE,
  INDEX `funcao` (`funcao` ASC) INVISIBLE);

ALTER TABLE `reformaaqui`.`recomendacao`
ADD FOREIGN KEY (cpfCliente) REFERENCES cliente(cpf)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `reformaaqui`.`recomendacao`
ADD FOREIGN KEY (cpfAutonomo) REFERENCES autonomo(cpf)
ON DELETE CASCADE
ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `reformaaqui`.`solicitacaoOrcamento` (
  `idSolicitacao` INT NOT NULL AUTO_INCREMENT,
  `cpfCliente` VARCHAR(15) NOT NULL,
  `cpfAutonomo` VARCHAR(15) NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  `tipo` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`idSolicitacao`),
  INDEX `cpfCliente` (`cpfCliente` ASC) INVISIBLE,
  INDEX `cpfAutonomo` (`cpfAutonomo` ASC) INVISIBLE,
  INDEX `tipo` (`tipo` ASC) INVISIBLE);

ALTER TABLE `reformaaqui`.`solicitacaoOrcamento`
ADD FOREIGN KEY (cpfCliente) REFERENCES cliente(cpf)
ON DELETE CASCADE
ON UPDATE CASCADE;

ALTER TABLE `reformaaqui`.`solicitacaoOrcamento`
ADD FOREIGN KEY (cpfAutonomo) REFERENCES autonomo(cpf)
ON DELETE CASCADE
ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `reformaaqui`.`orcamento` (
  `idOrcamento` INT NOT NULL AUTO_INCREMENT,
  `idSolicitacao` INT NOT NULL,
  `cpfCliente` VARCHAR(15) NOT NULL,
  `cpfAutonomo` VARCHAR(15) NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  `tipo` VARCHAR(25) NOT NULL,
  `preco` DECIMAL(8,2) NOT NULL,
  `previsaoDias` INT NOT NULL,
  `situacao` VARCHAR(25) NOT NULL,
  PRIMARY KEY (`idOrcamento`),
  INDEX `idSolicitacao` (`idSolicitacao` ASC) INVISIBLE,
  INDEX `cpfCliente` (`cpfCliente` ASC) INVISIBLE,
  INDEX `cpfAutonomo` (`cpfAutonomo` ASC) INVISIBLE,
  INDEX `tipo` (`tipo` ASC) INVISIBLE,
  INDEX `preco` (`preco` ASC) INVISIBLE);

ALTER TABLE `reformaaqui`.`orcamento`
ADD FOREIGN KEY (idSolicitacao) REFERENCES solicitacaoOrcamento(idSolicitacao)
ON DELETE CASCADE
ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `reformaaqui`.`avaliacao` (
  `idAvaliacao` INT NOT NULL AUTO_INCREMENT,
  `idOrcamento` INT NOT NULL,
  `numEstrelas` INT NOT NULL,
  `descricao` VARCHAR(255) NOT NULL,
  PRIMARY KEY (`idAvaliacao`),
  INDEX `idOrcamento` (`idOrcamento` ASC) INVISIBLE);

ALTER TABLE `reformaaqui`.`avaliacao`
ADD FOREIGN KEY (idOrcamento) REFERENCES orcamento(idOrcamento)
ON DELETE CASCADE
ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `reformaaqui`.`historico` (
  `idHistorico` INT NOT NULL AUTO_INCREMENT,
  `idOrcamento` INT NOT NULL,
  `descricao` VARCHAR(255) NULL,
  `atraso` BIT(1) NOT NULL,
  `numDiasAtraso` INT NOT NULL,
  `aumentoCusto` BIT(1) NOT NULL,
  `valorAcima` DECIMAL(8,2) NOT NULL,
  PRIMARY KEY (`idHistorico`),
  INDEX `idOrcamento` (`idOrcamento` ASC) INVISIBLE);

ALTER TABLE `reformaaqui`.`historico`
ADD FOREIGN KEY (idOrcamento) REFERENCES orcamento(idOrcamento)
ON DELETE CASCADE
ON UPDATE CASCADE;

CREATE TABLE IF NOT EXISTS `reformaaqui`.`foto` (
  `idFoto` INT NOT NULL AUTO_INCREMENT,
  `idHistorico` INT NOT NULL,
  `image` VARCHAR(255) NOT NULL,
  `descricao` VARCHAR(255) NULL,
  PRIMARY KEY (`idFoto`),
  INDEX `idHistorico` (`idHistorico` ASC) INVISIBLE);

ALTER TABLE `reformaaqui`.`foto`
ADD FOREIGN KEY (idHistorico) REFERENCES historico(idHistorico)
ON DELETE CASCADE
ON UPDATE CASCADE;
