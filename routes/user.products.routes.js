const express = require('express');
const router = express.Router();

const userProductController = require('../controller/user.product.controller');

router.get('/', userProductController.findAll);
router.get('/:username', userProductController.findOne);
router.post('/', userProductController.create);
router.patch('/:username', userProductController.update);
router.delete('/:username', userProductController.delete);

module.exports = router;