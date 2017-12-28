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

function getPessoas(req, res, next) {
  db.any('select * from pessoa')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all pessoas'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getLocatarios(req, res, next) {
  db.any('SELECT * FROM public.pessoa where user_tipo =$1', 1)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all locatarios'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getLocadores(req, res, next) {
  db.any('SELECT * FROM public.pessoa where user_tipo = $1',2)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all locadores'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getPessoa(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM pessoa WHERE id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one pessoa'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createPessoa(req, res, next) {
  req.body.launched = parseInt(req.body.launched);

  db.one('INSERT INTO public.pessoa(nome, user_tipo, nascimento,cpf, rg, emissor, uf, sexo, naturalidade, pai, mae, estado)' +
  'VALUES (${nome},${user_tipo}, ${nascimento}, ${cpf}, ${rg}, ${emissor}, ${uf}, ${sexo}, ${naturalidade}, ${pai}, ${mae},${estado})RETURNING id;',
  req.body)
    .then(function (data) {
      res.status(200)
        .json({
          data:data,
          status: 'success',
          message: 'Inserted one pessoa'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updatePessoa(req, res, next) {
  db.none('UPDATE public.pessoa SET nome=$1, nascimento=$11,cpf=$2, rg=$3, emissor=$4, uf=$5, sexo=$6, naturalidade=$7, pai=$8, mae=$9, estado=$11 where id=$10',
    [req.body.nome, req.body.cpf, req.body.rg,req.body.emissor,req.body.uf,req.body.sexo, req.body.naturalidade,req.body.pai,req.body.mae, parseInt(req.params.id),req.body.nascimento,req.body.estado])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated pessoa'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removePessoa(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.pessoa WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} pessoa (s)'
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
    getPessoas: getPessoas,
    getLocatarios: getLocatarios,
    getLocadores: getLocadores,
    getPessoa: getPessoa,
    createPessoa: createPessoa,
    updatePessoa: updatePessoa,
    removePessoa: removePessoa
};
