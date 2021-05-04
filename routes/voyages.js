const express = require('express')
const router = express.Router()

const Voyages = require('../controller/voyages.controller.js');

router.post('/add', Voyages.create);

module.exports= router;