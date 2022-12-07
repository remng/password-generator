const router = require('express').Router();

const GeneratorController = require('../controllers/GeneratorController');

router.post('/generate', GeneratorController.generate);

module.exports = router;