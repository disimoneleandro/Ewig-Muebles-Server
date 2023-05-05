var express = require('express');
var router = express.Router();

router.get('/productos', function (req, res) {
    res.send('Soy productos')
  });

module.exports = router;