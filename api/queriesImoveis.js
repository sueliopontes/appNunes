var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://postgres:root@localhost:5432/postgres';
//var connectionString = 'postgres://ququfxvhdxxxay:6d63b33a6b0a4f0c088f204affe5cc2771cd793b65701f9d5cdc568b655537e7@ec2-50-19-236-223.compute-1.amazonaws.com:5432/dbcta753qqcblj';
var db = pgp(connectionString);

function getImoveis(req, res, next) {
  db.any('SELECT * FROM imoveis')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all imoveis'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getImoveisFull(req, res, next) {
  //db.any('SELECT imoveis.id,endereco3.bairro,endereco3.logradouro,locador.nome FROM imoveis,endereco3,locador where imoveis.locador_id = locador.id and imoveis.id=endereco3.user_id')
  //db.any('select imoveis.id,endereco3.bairro,endereco3.logradouro,locador.nome from imoveis,endereco3,locador where imoveis.id=endereco3.user_id and imoveis.locador_id=locador_id')
  db.any('select i.id,e.bairro,e.logradouro,l.nome from imoveis i LEFT OUTER JOIN endereco e on i.id=e.user_id inner join pessoa l on i.pessoa_id=l.id')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all imoveis'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}


function getImovel(req, res, next) {
  var id = parseInt(req.params.id);
  db.any('SELECT * FROM imoveis WHERE id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one imoveis'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createImovel(req, res, next) {
  req.body.launched = parseInt(req.body.launched);

  db.none('INSERT INTO public.imoveis(locador_id,iptu,agua,luz,obs)' + 'VALUES (${locador_id},${iptu},${agua},${luz},${obs})', req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one imoveis'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateImovel(req, res, next) {
  db.none('UPDATE public.imoveis SET locador_id=$1, iptu=$2,agua=$3,luz=$4,obs=$5  where id=$6',
    [req.body.locador_id,req.body.iptu,req.body.agua,req.body.luz,req.body.obs,req.body.id])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated imoveis'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeImovel(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.imoveis WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} imoveis'
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
    getImoveis: getImoveis,
    getImovel: getImovel,
    getImoveisFull: getImoveisFull,
    createImovel: createImovel,
    updateImovel: updateImovel,
    removeImovel: removeImovel
};
