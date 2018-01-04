var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://postgres:root@localhost:5432/postgres';
var connectionString = 'postgres://ququfxvhdxxxay:6d63b33a6b0a4f0c088f204affe5cc2771cd793b65701f9d5cdc568b655537e7@ec2-50-19-236-223.compute-1.amazonaws.com:5432/dbcta753qqcblj';
var db = pgp(connectionString);

function getContratos(req, res, next) {
  db.any('SELECT * FROM contrato')
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all contrato'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getContrato(req, res, next) {
  var id = parseInt(req.params.id);
  db.any('SELECT * FROM contrato WHERE id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved one contrato'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function getContratoLocador(req, res, next) {
  var id = parseInt(req.params.id);
  db.any('SELECT * FROM contrato WHERE locador_id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all contrato of locador'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}
function getContratoLocatario(req, res, next) {
  var id = parseInt(req.params.id);
  db.any('SELECT * FROM contrato WHERE locatario_id = $1', id)
    .then(function (data) {
      res.status(200)
        .json({
          status: 'success',
          data: data,
          message: 'Retrieved all contrato of locatário'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function createContrato(req, res, next) {
  req.body.launched = parseInt(req.body.launched);

  db.none('INSERT INTO public.contrato(locador_id,locatario_id, imoveis_id,data_contrato,valor,taxa_adm,data_pgt,vigencia)' +
  'VALUES (${locatarioId},${locadorId}, ${imoveisId}, ${dataContrato}, ${valor}, ${taxaAdm}, ${dataPgt}, ${vigencia})',
  req.body)
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Inserted one contrato'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function updateContrato(req, res, next) {
  db.none('UPDATE public.contrato SET locador_id=$1,locatario_id=$2, imoveis_id=$3,data_contrato=$4,valor=$5,taxa_adm=$6,data_pgt=$7,vigencia=$8 WHERE id = $9',
    [req.body.locadorId, req.body.locatarioId, req.body.imoveisId,req.body.dataContrato,req.body.valor,req.body.taxaAdm,req.body.dataPgt,req.body.vigencia,parseInt(req.params.id)])
    .then(function () {
      res.status(200)
        .json({
          status: 'success',
          message: 'Updated contrato'
        });
    })
    .catch(function (err) {
      return next(err);
    });
}

function removeContrato(req, res, next) {
  var id = parseInt(req.params.id);
  db.result('DELETE FROM public.contrato WHERE id = $1', id)
    .then(function (result) {
      /* jshint ignore:start */
      res.status(200)
        .json({
          status: 'success',
          message: 'Removed ${result.rowCount} contrato'
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
    getContratos: getContratos,
    getContrato: getContrato,
    getContratoLocador: getContratoLocador,
    getContratoLocatario: getContratoLocatario,
    createContrato: createContrato,
    updateContrato: updateContrato,
    removeContrato: removeContrato
};
