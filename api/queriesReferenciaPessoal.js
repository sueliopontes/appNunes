var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://postgres:root@localhost:5432/postgres';
var connectionString = 'postgres://ququfxvhdxxxay:6d63b33a6b0a4f0c088f204affe5cc2771cd793b65701f9d5cdc568b655537e7@ec2-50-19-236-223.compute-1.amazonaws.com:5432/dbcta753qqcblj';
var db = pgp(connectionString);

/////////////////////
// Query Functions
/////////////////////

function getRPs(req, res, next) {
  db.any('SELECT * FROM referencia_pessoal')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all RP'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getRPSUser(req, res, next) {
  var id = parseInt(req.params.id);
  db.any('SELECT * FROM referencia_pessoal WHERE user_id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all RPS por user_id'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getRP(req, res, next) {
  var id = parseInt(req.params.id);
  db.any('SELECT * FROM referencia_pessoal WHERE id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one RP por id'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function createRP(req, res, next) {
  req.body.launched = parseInt(req.body.launched);
  db.none('INSERT INTO public.referencia_pessoal(nome,telefone, parentesco,user_id)' +
  'VALUES (${nome}, ${telefone}, ${parentesco},${user_id})',
  req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one RP'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateRP(req, res, next) {
  db.none('UPDATE public.referencia_pessoal SET nome=$1, telefone=$2, parentesco=$3 WHERE id = $4',
    [req.body.nome, req.body.telefone, req.body.parentesco,parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated RP'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeRP(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.referencia_pessoal WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} RP'
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
    getRPs: getRPs,
    getRPSUser: getRPSUser,
    getRP: getRP,    
    createRP: createRP,
    updateRP: updateRP,
    removeRP: removeRP
};
