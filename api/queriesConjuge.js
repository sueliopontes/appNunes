var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://localhost:5432/public';
var connectionString = 'postgres://ququfxvhdxxxay:6d63b33a6b0a4f0c088f204affe5cc2771cd793b65701f9d5cdc568b655537e7@ec2-50-19-236-223.compute-1.amazonaws.com:5432/dbcta753qqcblj';
var db = pgp(connectionString);

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


function getAllConjuges(req, res, next) {
  db.any('SELECT * FROM conjuge')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all conjuge'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getConjuge(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM conjuge WHERE id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one conjuge'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getConjugeUser(req, res, next) {
  var id = parseInt(req.params.id);
  db.any('SELECT * FROM conjuge WHERE user_id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one conjuge'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createConjuge(req, res, next) {
  req.body.launched = parseInt(req.body.launched);

  db.none('INSERT INTO public.conjuge(nome,user_id,cpf,rg)' +
  'VALUES (${nome},${user}, ${cpf}, ${rg})',
  req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one conjuge'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateConjuge(req, res, next) {
  db.none('UPDATE public.conjuge SET nome=$1, cpf=$2, rg=$3 WHERE id = $4',
    [req.body.nome, req.body.cpf, req.body.rg,parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated conjuge'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeConjuge(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.conjuge WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} conjuge'
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeConjuge(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.conjuge WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} conjuge'
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
  getAllConjuges: getAllConjuges,    
    getConjuge: getConjuge,
    getConjugeUser: getConjugeUser,
    createConjuge: createConjuge,
    updateConjuge: updateConjuge,
    removeConjuge: removeConjuge
};




