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

module.exports = router;
