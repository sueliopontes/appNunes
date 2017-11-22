DROP TABLE IF EXISTS locatario;
CREATE TABLE locatario (
	  id SERIAL NOT NULL PRIMARY KEY,
	  nome VARCHAR(60),
    cpf VARCHAR(20),
    rg VARCHAR(15),
    emissor VARCHAR(5),
    uf VARCHAR(20),
    sexo VARCHAR(20),
    nascimento VARCHAR(20),
    naturalidade VARCHAR(20),
    pai VARCHAR(60),
    mae VARCHAR(60),
    estado VARCHAR(20)
);

DROP TABLE IF EXISTS endereco;
CREATE TABLE endereco (
	  id SERIAL NOT NULL PRIMARY KEY,
      user_id INTEGER,
	  logradouro VARCHAR(60),
    numero VARCHAR(11),
    bairro VARCHAR(60),
    cidade VARCHAR(60),
    cep VARCHAR(20),
    uf VARCHAR(20)    
);

DROP TABLE IF EXISTS contato;
CREATE TABLE contato (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER,
    fixo VARCHAR(15),
    celular VARCHAR(15),
    recado VARCHAR(15),
    email VARCHAR(60)   
);

DROP TABLE IF EXISTS ocupacao;
CREATE TABLE ocupacao (
	  id SERIAL NOT NULL PRIMARY KEY,
      user_id INTEGER,
	  empresa VARCHAR(60),
    cnpj VARCHAR(20),
    contato VARCHAR(15),
    endereco VARCHAR(60),
    admissao VARCHAR(60),
    salario VARCHAR(60),
    ocupacao VARCHAR(60),
    rendas VARCHAR(60)    
);

DROP TABLE IF EXISTS referencia_pessoal;
CREATE TABLE referencia_pessoal (
	id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER,
	nome VARCHAR(60),
    telefone VARCHAR(20),
    parentesco VARCHAR(30)   
);

DROP TABLE IF EXISTS referencia_comercial;
CREATE TABLE referencia_comercial (
	id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER,
	empresa VARCHAR(60),
    contato VARCHAR(60),
    telefone VARCHAR(30)   
);

DROP TABLE IF EXISTS banco;
CREATE TABLE banco (
	id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER,
	banco_numero VARCHAR(60),
    banco_nome VARCHAR(15),
    banco_agencia VARCHAR(30), 
    banco_conta VARCHAR(30),
    banco_data_abertura VARCHAR(30)   
);

