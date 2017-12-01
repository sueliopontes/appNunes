var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://localhost:5432';
var connectionString = 'postgres://ququfxvhdxxxay:6d63b33a6b0a4f0c088f204affe5cc2771cd793b65701f9d5cdc568b655537e7@ec2-50-19-236-223.compute-1.amazonaws.com:5432/dbcta753qqcblj';
var db = pgp(connectionString);


/////////////////////
// Query Functions
/////////////////////
/*
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
*/
function getAllLocadors(req, res, next) {
  db.any('SELECT * FROM locador')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all locador'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getLocador(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM locador WHERE id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one locador'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createLocador(req, res, next) {
  req.body.launched = parseInt(req.body.launched);

  db.none('INSERT INTO public.locador(nome, nascimento,cpf, rg, emissor, uf, sexo, naturalidade, pai, mae, estado)' +
  'VALUES (${nome}, ${nascimento}, ${cpf}, ${rg}, ${emissor}, ${uf}, ${sexo}, ${naturalidade}, ${pai}, ${mae},${estado})',
  req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one locador'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateLocador(req, res, next) {
  db.none('UPDATE public.locador SET nome=$1, nascimento=$11,cpf=$2, rg=$3, emissor=$4, uf=$5, sexo=$6, naturalidade=$7, pai=$8, mae=$9, estado=$11 where id=$10',
    [req.body.nome, req.body.cpf, req.body.rg,req.body.emissor,req.body.uf,req.body.sexo, req.body.naturalidade,req.body.pai,req.body.mae, parseInt(req.params.id),req.body.nascimento,req.body.estado])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated locador'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeLocador(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.locador WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} locador'
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
    getAllLocadors: getAllLocadors,
    getLocador: getLocador,
    createLocador: createLocador,
    updateLocador: updateLocador,
    removeLocador: removeLocador
};
