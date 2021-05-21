const express = require('express');
const router = express.Router();

const transport = require('../controller/transport.controller.js');
router.get('/displayTransPage', transport.displayTransPage);



module.exports = router;