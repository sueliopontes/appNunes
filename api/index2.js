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

var db = require('./queries');

router.get('/api/locatario', db.getAllLocatarios);
router.get('/api/locatario/:id', db.getLocatario);
router.post('/api/locatario', db.createLocatario);
router.put('/api/locatario/:id', db.updateLocatario);
router.delete('/api/locatario/:id', db.removeLocatario);

module.exports = router;
