var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://localhost:5432/startrek'; // startrek is an example database name
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
function getAllEnderecos(req, res, next) {
  db.any('SELECT * FROM endereco')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all Endereco'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getEndereco(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM endereco WHERE id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one Endereco'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createEndereco(req, res, next) {
  req.body.launched = parseInt(req.body.launched);

  db.none('INSERT INTO public.endereco(logradouro,numero,bairro,cidade,cep,estado)' +
  'VALUES (${logradouro}, ${numero}, ${bairro}, ${cep}, ${cidade}, ${estado})',
  req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Endereco'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateEndereco(req, res, next) {
  db.none('UPDATE public.endereco SET logradouro=$1, numero=$2, bairro=$3, cidade=$4, cep=$5, estado=$6 where id=$7',
    [req.body.logradouro, req.body.numero, req.body.bairro,req.body.cidade,req.body.cep, req.body.estado,parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Endereco'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeEndereco(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.endereco WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} Endereco'
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeEndereco(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.endereco WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} Endereco'
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
    getAllEnderecos: getAllEnderecos,
    getEndereco: getEndereco,
    createEndereco: createEndereco,
    updateEndereco: updateEndereco,
    removeEndereco: removeEndereco
};
