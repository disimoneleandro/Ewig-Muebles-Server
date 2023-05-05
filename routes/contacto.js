var express = require('express');
var router = express.Router();

router.get('/contacto', function (req, res) {
    res.send('Soy contacto')
  });

module.exports = router;