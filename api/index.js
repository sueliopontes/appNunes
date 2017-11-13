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

var db1 = require('./queriesLocatario');

router.get('/api/locatario', db1.getAllLocatarios);
router.get('/api/locatario/:id', db1.getLocatario);
router.post('/api/locatario', db1.createLocatario);
router.put('/api/locatario/:id', db1.updateLocatario);
router.delete('/api/locatario/:id', db1.removeLocatario);


var db2 = require('./queriesEndereco');

router.get('/api/endereco', db2.getAllEnderecos);
router.get('/api/endereco/:id', db2.getEndereco);
router.post('/api/endereco', db2.createEndereco);
router.put('/api/endereco/:id', db2.updateEndereco);
router.delete('/api/endereco/:id', db2.removeEndereco);

var db3 = require('./queriesContato');

router.get('/api/contato', db3.getAllContatos);
router.get('/api/contato/:id', db3.getContato);
router.post('/api/contato', db3.createContato);
router.put('/api/contato/:id', db3.updateContato);
router.delete('/api/contato/:id', db3.removeContato);


var db4 = require('./queriesBanco');

router.get('/api/banco', db4.getAllBancos);
router.get('/api/banco/:id', db4.getBanco);
router.post('/api/banco', db4.createBanco);
router.put('/api/banco/:id', db4.updateBanco);
router.delete('/api/banco/:id', db4.removeBanco);

var db5 = require('./queriesReferenciaPessoal');

router.get('/api/rp', db5.getAllRPs);
router.get('/api/rp/:id', db5.getRP);
router.post('/api/rp', db5.createRP);
router.put('/api/rp/:id', db5.updateRP);
router.delete('/api/rp/:id', db5.removeRP);

var db6 = require('./queriesReferenciaComercial');

router.get('/api/rc', db6.getAllRCs);
router.get('/api/rc/:id', db6.getRC);
router.post('/api/rc', db6.createRC);
router.put('/api/rc/:id', db6.updateRC);
router.delete('/api/rc/:id', db6.removeRC);

var db7 = require('./queriesOcupacao');

router.get('/api/ocupacao', db7.getAllOcupacoes);
router.get('/api/ocupacao/:id', db7.getOcupacao);
router.post('/api/ocupacao', db7.createOcupacao);
router.put('/api/ocupacao/:id', db7.updateOcupacao);
router.delete('/api/ocupacao/:id', db7.removeOcupacao);


module.exports = router;
