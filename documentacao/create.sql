DROP TABLE IF EXISTS pessoa;
CREATE TABLE pessoa (
	id SERIAL NOT NULL PRIMARY KEY,
	nome VARCHAR(60),
    user_tipo INTEGER,
    cpf VARCHAR(20),
    rg VARCHAR(20),
    emissor VARCHAR(20),
    uf VARCHAR(20),
    sexo VARCHAR(20),
    nascimento VARCHAR(20),
    naturalidade VARCHAR(30),
    pai VARCHAR(60),
    mae VARCHAR(60),
    estado VARCHAR(20)
);

--Endereço dos locatários
DROP TABLE IF EXISTS endereco;
CREATE TABLE endereco (
	id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER,
    logradouro VARCHAR(60),
    complemento VARCHAR(60),
    numero VARCHAR(11),
    bairro VARCHAR(60),
    cidade VARCHAR(60),
    cep VARCHAR(20),
    uf VARCHAR(20)    
);
--Contato das pessoas
DROP TABLE IF EXISTS contato;
CREATE TABLE contato (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER,    
    fixo VARCHAR(15),
    celular VARCHAR(15),
    recado VARCHAR(15),
    email VARCHAR(60)   
);

DROP TABLE IF EXISTS conjuge;
CREATE TABLE conjuge (
    id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER,
    nome VARCHAR(60),
    cpf VARCHAR(20),
    rg VARCHAR(20)   
);

DROP TABLE IF EXISTS ocupacao;
CREATE TABLE ocupacao (
	id SERIAL NOT NULL PRIMARY KEY,
    user_id INTEGER,
	empresa VARCHAR(60),
    cnpj VARCHAR(60),
    contato VARCHAR(60),
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
    banco_nome VARCHAR(60),
    banco_agencia VARCHAR(30), 
    banco_conta VARCHAR(30),
    banco_data_abertura VARCHAR(30)   
);

DROP TABLE IF EXISTS locador;

DROP TABLE IF EXISTS imoveis;
CREATE TABLE imoveis (
	id SERIAL NOT NULL PRIMARY KEY,
	user_id INTEGER,
    iptu  varchar(60),
    agua varchar(60),
    luz varchar(60),
    obs varchar(60)
);

DROP TABLE IF EXISTS imoveis_comodo;
CREATE TABLE imoveis_comodo (
	id SERIAL NOT NULL PRIMARY KEY,
	imoveis_id INTEGER,
    comodo_id INTEGER,
    qtd varchar(10)
);

DROP TABLE IF EXISTS comodo;
CREATE TABLE comodo (
	id SERIAL NOT NULL PRIMARY KEY,
	comodo VARCHAR(60)      
);
DROP TABLE IF EXISTS contrato;
CREATE TABLE contrato (
	id SERIAL NOT NULL PRIMARY KEY,
	locador_id INTEGER,
    locatario_id INTEGER,
    imoveis_id INTEGER,
    valor VARCHAR(5),
    vigencia VARCHAR(20),
    data_contrato VARCHAR(20),
    taxa_adm VARCHAR(20),
    data_pgt VARCHAR(20)
);




