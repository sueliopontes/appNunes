var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/public';
//var connectionString = 'postgres://ququfxvhdxxxay:6d63b33a6b0a4f0c088f204affe5cc2771cd793b65701f9d5cdc568b655537e7@ec2-50-19-236-223.compute-1.amazonaws.com:5432/dbcta753qqcblj';
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
function getAllContatos(req, res, next) {
  db.any('SELECT * FROM contato')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all Contato'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getContato(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM contato WHERE id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one Contato'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getContatoUser(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM contato WHERE user_id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one Contato'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createContato(req, res, next) {
  req.body.launched = parseInt(req.body.launched);

  db.none('INSERT INTO public.contato(fixo,celular,email,recado)' +
  'VALUES (${fixo}, ${celular}, ${email}, ${recado})',
  req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Contato'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateContato(req, res, next) {
  db.none('UPDATE public.contato SET fixo=$1, celular=$2, email=$3, recado=$4',
    [req.body.fixo, req.body.celular, req.body.email,req.body.recado,parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Contato'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeContato(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.contato WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} Contato'
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeContato(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.contato WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} Contato'
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
    getAllContatos: getAllContatos,
    getContato: getContato,
    getContatoUser: getContatoUser,
    createContato: createContato,
    updateContato: updateContato,
    removeContato: removeContato
};
