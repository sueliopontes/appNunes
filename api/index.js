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

router.get('/api/Locatario', db.getAllLocatarios);
router.get('/api/Locatario/:id', db.getLocatario);
router.post('/api/Locatario', db.createLocatario);
router.put('/api/Locatario/:id', db.updateLocatario);
router.delete('/api/Locatario/:id', db.removeLocatario);

module.exports = router;
