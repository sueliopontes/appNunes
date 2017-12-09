var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://localhost:5432';
var connectionString = 'postgres://ququfxvhdxxxay:6d63b33a6b0a4f0c088f204affe5cc2771cd793b65701f9d5cdc568b655537e7@ec2-50-19-236-223.compute-1.amazonaws.com:5432/dbcta753qqcblj';
var db = pgp(connectionString);

function getAllImoveis(req, res, next) {
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


function getImoveis(req, res, next) {
  var id = parseInt(req.params.id);
  db.one('SELECT * FROM imoveis WHERE id = $1', id)
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

function createImoveis(req, res, next) {
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

function updateImoveis(req, res, next) {
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

function removeImoveis(req, res, next) {
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
    getAllImoveis: getAllImoveis,
    getImoveis: getImoveis,
    createImoveis: createImoveis,
    updateImoveis: updateImoveis,
    removeImoveis: removeImoveis
};
