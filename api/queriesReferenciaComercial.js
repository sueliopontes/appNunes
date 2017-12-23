var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://localhost:5432/public';
var connectionString = 'postgres://ququfxvhdxxxay:6d63b33a6b0a4f0c088f204affe5cc2771cd793b65701f9d5cdc568b655537e7@ec2-50-19-236-223.compute-1.amazonaws.com:5432/dbcta753qqcblj';
var db = pgp(connectionString);


/////////////////////
// Query Functions
/////////////////////

function getRCs(req, res, next) {
  db.any('SELECT * FROM referencia_comercial')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all RC'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getRC(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM referencia_comercial WHERE id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one RC'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getRCUser(req, res, next) {
  var id = parseInt(req.params.id);
  db.any('SELECT * FROM referencia_comercial WHERE user_id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one RC'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createRC(req, res, next) {
  req.body.launched = parseInt(req.body.launched);

  db.none('INSERT INTO public.referencia_comercial(empresa,contato,telefone,user_id)' +
  'VALUES (${empresa}, ${contato}, ${telefone},${user_id})',
  req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one RC'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateRC(req, res, next) {
  db.none('UPDATE public.referencia_comercial SET empresa=$1, contato=$2, telefone=$3 where id=$4',
    [req.body.empresa, req.body.contato, req.body.telefone,parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated RC'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeRC(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.referencia_comercial WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} RC'
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeRC(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.referencia_comercial WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} RC'
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
    getRCs: getRCs,
    getRC: getRC,
    getRCUser: getRCUser,
    createRC: createRC,
    updateRC: updateRC,
    removeRC: removeRC
};
