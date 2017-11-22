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

function getAllOcupacoes(req, res, next) {
  db.any('SELECT * FROM ocupacao')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all Ocupacao'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getOcupacao(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM ocupacao WHERE id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one Ocupacao'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getOcupacaoUser(req, res, next) {
  var id = parseInt(req.params.id);
  db.any('SELECT * FROM ocupacao WHERE user_id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one Ocupacao'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function createOcupacao(req, res, next) {
  req.body.launched = parseInt(req.body.launched);

  db.none('INSERT INTO public.ocupacao(empresa, cnpj, contato,endereco,admissao,salario,ocupacao,rendas,user_id)' +
  'VALUES (${empresa}, ${cnpj}, ${contato}, ${endereco}, ${admissao}, ${salario}, ${ocupacao}, ${rendas},${user})',
  req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one Ocupacao'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateOcupacao(req, res, next) {
  db.none('UPDATE public.ocupacao SET empresa=$1, cnpj=$2, contato=$3, endereco=$4, admissao=$5, salario=$6, ocupacao=$7, rendas=$7 where id=$8',
    [req.body.empresa, req.body.cnpj, req.body.contato,req.body.endereco,req.body.admissao,req.body.salario,req.body.ocupacao,req.body.rendas,parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated Ocupacao'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeOcupacao(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.ocupacao WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} Ocupacao'
        });
      /* jshint ignore:end */
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeOcupacao(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.ocupacao WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} Ocupacao'
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
    getAllOcupacoes: getAllOcupacoes,
    getOcupacao: getOcupacao,
    getOcupacaoUser: getOcupacaoUser,
    createOcupacao: createOcupacao,
    updateOcupacao: updateOcupacao,
    removeOcupacao: removeOcupacao
};
