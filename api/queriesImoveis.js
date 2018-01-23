var promise = require('bluebird');

var options = {
  // Initialization Options
  promiseLib: promise
};

var pgp = require('pg-promise')(options);
//var connectionString = 'postgres://postgres:root@localhost:5432/postgres';
var connectionString = 'postgres://ququfxvhdxxxay:6d63b33a6b0a4f0c088f204affe5cc2771cd793b65701f9d5cdc568b655537e7@ec2-50-19-236-223.compute-1.amazonaws.com:5432/dbcta753qqcblj';
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

function getImoveisSlim(req, res, next) {
  //db.any('SELECT imoveis.id,endereco3.bairro,endereco3.logradouro,locador.nome FROM imoveis,endereco3,locador where imoveis.locador_id = locador.id and imoveis.id=endereco3.user_id')
  //db.any('select imoveis.id,endereco3.bairro,endereco3.logradouro,locador.nome from imoveis,endereco3,locador where imoveis.id=endereco3.user_id and imoveis.locador_id=locador_id')
  db.any('select i.id,i.bairro,i.logradouro,i.numero,l.nome from imoveis i LEFT OUTER JOIN pessoa l on i.user_id=l.id')

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

  db.none('INSERT INTO public.imoveis(user_id,iptu,agua,luz,obs,logradouro,numero,bairro,cidade,cep,uf,complemento)' +
   'VALUES (${user_id},${iptu},${agua},${luz},${obs},${logradouro}, ${numero}, ${bairro},  ${cidade},${cep}, ${uf},${complemento})', req.body)
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
  db.none('UPDATE public.imoveis SET user_id=$1, iptu=$2,agua=$3,luz=$4,obs=$5,logradouro=$6, numero=$7, bairro=$8, cidade=$9, cep=$10, uf=$11, complemento=$12  where id=$13',
    [req.body.user_id,req.body.iptu,req.body.agua,req.body.luz,req.body.obs,req.body.logradouro, req.body.numero, req.body.bairro,req.body.cidade,req.body.cep, req.body.uf,req.body.complemento,parseInt(req.params.id)])
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
    getImoveisSlim: getImoveisSlim,
    createImovel: createImovel,
    updateImovel: updateImovel,
    removeImovel: removeImovel
};
