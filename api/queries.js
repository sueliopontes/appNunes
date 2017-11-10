var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/startrek'; // startrek is an example database name
//var connectionString = 'postgres://ququfxvhdxxxay:6d63b33a6b0a4f0c088f204affe5cc2771cd793b65701f9d5cdc568b655537e7@ec2-50-19-236-223.compute-1.amazonaws.com:5432/dbcta753qqcblj';
var db = pgp(connectionString);


/////////////////////
// Query Functions
/////////////////////

function getAllLocatarios(req, res, next) {
  db.any('SELECT * FROM locatario')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all locatário'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getLocatario(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM locatario WHERE id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one locarario'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createLocatario(req, res, next) {
  req.body.launched = parseInt(req.body.launched);

  db.none('INSERT INTO public.locatario(nome, cpf, rg, emissorrg, ufrg, sexo, naturalidade, nomepai,nomemae)' +
  'VALUES (${nome},${cpf},${rg},${emissorRg},${ufRg},${sexo},${naturalidade},${nomePai},${nomeMae})',req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one locatario'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updatelocatario(req, res, next) {
  db.none('UPDATE public.locatario SET nome=$1, cpf=$2, rg=$3, emissorRg=$4, ufRg=$5, sexo=$6, naturalidade=$7, nomePai=$8, nomeMae=$9 where id=$10',
    [req.body.name, req.body.registry, req.body.affiliation, parseInt(req.body.launched), req.body.class, parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated locatario'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeLocatario(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.locatario WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} locarario'
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
    getAllLocatarios: getAllLocatarios,
    getLocatario: getLocatario,
    createLocatario: createLocatario,
    updateLocatario: updateLocatario,
    removeLocatario: removeLocatario
};
