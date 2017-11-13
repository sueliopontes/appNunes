var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://ququfxvhdxxxay:6d63b33a6b0a4f0c088f204affe5cc2771cd793b65701f9d5cdc568b655537e7@ec2-50-19-236-223.compute-1.amazonaws.com:5432/dbcta753qqcblj';
var db = pgp(connectionString);


function getAllBancos(req, res, next) {
  db.any('SELECT * FROM banco')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all Banco'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getBanco(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM banco WHERE id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one Banco'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createBanco(req, res, next) {
  req.body.launched = parseInt(req.body.launched);

  db.none('INSERT INTO public.banco(banco_numero,banco_nome,banco_agencia, banco_conta,banco_data_abertura)' +
  'VALUES (${banco_numero}, ${banco_nome}, ${banco_agencia}, ${banco_conta},${banco_data_abertura})',
  req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Banco'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateBanco(req, res, next) {
  db.none('UPDATE public.banco SET banco_numero=$1, banco_nome=$2, banco_agencia=$3,banco_conta=$4,banco_data_abertura=$5',
    [req.body.banco_numero, req.body.banco_nome, req.body.banco_agencia,req.body.banco_conta,req.body.banco_data_abertura,parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Banco'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeBanco(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.banco WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} Banco'
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeBanco(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.banco WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} Banco'
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
    getAllBancos: getAllBancos,
    getBanco: getBanco,
    createBanco: createBanco,
    updateBanco: updateBanco,
    removeBanco: removeBanco
};
