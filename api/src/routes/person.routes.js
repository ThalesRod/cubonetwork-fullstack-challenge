const express = require('express');
const router = express.Router();
const personController = require('../controllers/person.controller');

router.get('/person', personController.findAll);

router.post('/person', personController.create);

module.exports = router;