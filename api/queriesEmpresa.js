var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);

var connectionString = 'postgres://ququfxvhdxxxay:6d63b33a6b0a4f0c088f204affe5cc2771cd793b65701f9d5cdc568b655537e7@ec2-50-19-236-223.compute-1.amazonaws.com:5432/dbcta753qqcblj';
var db = pgp(connectionString);


/////////////////////
// Query Functions
/////////////////////

function getAllEmpresas(req, res, next) {
  db.any('SELECT * FROM empresa')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all Empresa'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getEmpresa(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM empresa WHERE id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one Empresa'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createEmpresa(req, res, next) {
  req.body.launched = parseInt(req.body.launched);

  db.none('INSERT INTO public.empresa(nome,cnpj,contato,endereco,admissao,salario,ocupacao,rendas)' +
  'VALUES (${nome}, ${cnpj}, ${contato}, ${endereco}, ${admissao}, ${salario}, ${ocupacao}, ${rendas})',
  req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Empresa'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateEmpresa(req, res, next) {
  db.none('UPDATE public.empresa SET nome=$1, cnpj=$2, contato=$3, endereco=$4, admissao=$5, salario=$6, ocupacao=$7, rendas=$7',
    [req.body.nome, req.body.cnpj, req.body.contato,req.body.endereco,req.body.admissao,req.body.salario,req.body.ocupacao,req.body.rendas,parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Empresa'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeEmpresa(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.empresa WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} Empresa'
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeEmpresa(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.empresa WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} Empresa'
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}


/////////////
// Exports
/////////////

module.exports = {
    getAllEmpresas: getAllEmpresas,
    getEmpresa: getEmpresa,
    createEmpresa: createEmpresa,
    updateEmpresa: updateEmpresa,
    removeEmpresa: removeEmpresa
};
