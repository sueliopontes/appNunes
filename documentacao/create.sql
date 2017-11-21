DROP TABLE IF EXISTS locatario;
CREATE TABLE locatario (
	  id SERIAL NOT NULL PRIMARY KEY,
	  nome VARCHAR(60) NOT NULL,
    cpf VARCHAR(11) NOT NULL,
    rg VARCHAR(10) NOT NULL,
    emissor VARCHAR(5) NOT NULL,
    uf VARCHAR(20) NOT NULL,
    sexo VARCHAR(20) NOT NULL,
    nascimento VARCHAR(20) NOT NULL,
    naturalidade VARCHAR(20) NOT NULL,
    pai VARCHAR(60) NOT NULL,
    mae VARCHAR(60) NOT NULL,
    estado VARCHAR(20) NOT NULL
);

DROP TABLE IF EXISTS endereco;
CREATE TABLE endereco (
	  id SERIAL NOT NULL PRIMARY KEY,
	  logradouro VARCHAR(60) NOT NULL,
    numero VARCHAR(11) NOT NULL,
    bairro VARCHAR(60) NOT NULL,
    cidade VARCHAR(60) NOT NULL,
    cep VARCHAR(20) NOT NULL,
    uf VARCHAR(20) NOT NULL    
);

DROP TABLE IF EXISTS contato;
CREATE TABLE contato (
    id SERIAL NOT NULL PRIMARY KEY,
    user INT NOT NULL,
    fixo VARCHAR(15) NOT NULL,
    celular VARCHAR(15) NOT NULL,
    recado VARCHAR(15) NOT NULL,
    email VARCHAR(60) NOT NULL
    
);

DROP TABLE IF EXISTS ocupacao;
CREATE TABLE ocupacao (
	  id SERIAL NOT NULL PRIMARY KEY,
	  empresa VARCHAR(60) NOT NULL,
    cnpj VARCHAR(20) NOT NULL,
    contato VARCHAR(15) NOT NULL,
    endereco VARCHAR(60) NOT NULL,
    admissao VARCHAR(60) NOT NULL,
    salario VARCHAR(60) NOT NULL,
    ocupacao VARCHAR(60) NOT NULL,
    rendas VARCHAR(60) NOT NULL
    
);

DROP TABLE IF EXISTS referencia_pessoal;
CREATE TABLE referencia_pessoal (
	id SERIAL NOT NULL PRIMARY KEY,
	nome VARCHAR(60) NOT NULL,
    telefone VARCHAR(15) NOT NULL,
    parentesco VARCHAR(30) NOT NULL   
);

DROP TABLE IF EXISTS referencia_comercial;
CREATE TABLE referencia_comercial (
	id SERIAL NOT NULL PRIMARY KEY,
	empresa VARCHAR(60) NOT NULL,
    contato VARCHAR(15) NOT NULL,
    telefone VARCHAR(30) NOT NULL   
);

DROP TABLE IF EXISTS banco;
CREATE TABLE banco (
	id SERIAL NOT NULL PRIMARY KEY,
	banco_numero VARCHAR(60) NOT NULL,
    banco_nome VARCHAR(15) NOT NULL,
    banco_agencia VARCHAR(30) NOT NULL, 
    banco_conta VARCHAR(30) NOT NULL,
    banco_data_abertura VARCHAR(30) NOT NULL   
    
);

