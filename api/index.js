var express = require('express');
var router = express.Router();


// http://localhost:3000/
router.get('/', function(req, res, next) {
    res.status(200)
      .json({
        status: 'success',
        message: 'Live long and prosper!'
      });
});


//////////////////////
// Postgres queries
//////////////////////

var db1 = require('./queriesPessoa');

router.get('/api/pessoa', db1.getPessoas);
router.get('/api/pessoa/:id', db1.getPessoa);
router.get('/api/locatario', db1.getLocatarios);
router.get('/api/locador', db1.getLocadores);
router.post('/api/pessoa', db1.createPessoa);
router.put('/api/pessoa/:id', db1.updatePessoa);
router.delete('/api/pessoa/:id', db1.removePessoa);


var db2 = require('./queriesEndereco');

router.get('/api/endereco', db2.getEnderecos);
router.get('/api/endereco/:id', db2.getEndereco);
router.post('/api/endereco', db2.createEndereco);
router.put('/api/endereco/:id', db2.updateEndereco);
router.delete('/api/endereco/:id', db2.removeEndereco);

var db3 = require('./queriesContato');

router.get('/api/contato', db3.getContatos);
router.get('/api/contato/:id', db3.getContato);
router.post('/api/contato', db3.createContato);
router.put('/api/contato/:id', db3.updateContato);
router.delete('/api/contato/:id', db3.removeContato);


var db4 = require('./queriesBanco');

router.get('/api/banco', db4.getBancos);
router.get('/api/banco/:id', db4.getBanco);
router.post('/api/banco', db4.createBanco);
router.put('/api/banco/:id', db4.updateBanco);
router.delete('/api/banco/:id', db4.removeBanco);

var db5 = require('./queriesReferenciaPessoal');

router.get('/api/rp', db5.getRPs);
router.get('/api/rp/:id', db5.getRP);
router.post('/api/rp', db5.createRP);
router.put('/api/rp/:id', db5.updateRP);
router.delete('/api/rp/:id', db5.removeRP);

var db6 = require('./queriesReferenciaComercial');

router.get('/api/rc', db6.getRCs);
router.get('/api/rc/:id', db6.getRC);
router.post('/api/rc', db6.createRC);
router.put('/api/rc/:id', db6.updateRC);
router.delete('/api/rc/:id', db6.removeRC);

var db7 = require('./queriesOcupacao');

router.get('/api/ocupacao', db7.getOcupacoes);
router.get('/api/ocupacao/:id', db7.getOcupacao);
router.post('/api/ocupacao', db7.createOcupacao);
router.put('/api/ocupacao/:id', db7.updateOcupacao);
router.delete('/api/ocupacao/:id', db7.removeOcupacao);


var db8 = require('./queriesConjuge');

router.get('/api/conjuge', db8.getConjuges);
router.get('/api/conjuge/:id', db8.getConjuge);
router.post('/api/conjuge', db8.createConjuge);
router.put('/api/conjuge/:id', db8.updateConjuge);
router.delete('/api/conjuge/:id', db8.removeConjuge);


var db10 = require('./queriesImoveis');

router.get('/api/imovel', db10.getImoveis);
router.get('/api/imovelFull', db10.getAllImoveisFull);
router.get('/api/imovel/:id', db10.getImovel);
router.post('/api/imovel', db10.createImovel);
router.put('/api/imovel/:id', db10.updateImovel);
router.delete('/api/imovel/:id', db10.removeImovel);

var db11 = require('./queriesContrato');

router.get('/api/contrato', db11.getContratos);
router.get('/api/contrato/:id', db11.getContrato);
router.post('/api/contrato', db11.createContrato);
router.put('/api/contrato/:id', db11.updateContrato);
router.delete('/api/contrato/:id', db11.removeContrato);

module.exports = router;
