var express = require('express');

var router = express.Router();

router.get('/card/:itemId', require('./controller/card').view);
router.get('/card/:itemId/edit', require('./controller/card').edit);
router.post('/card/:itemId/send', require('./controller/card').send);
router.post('/summercamp/send', require('./controller/summercamp').send);

module.exports = router;