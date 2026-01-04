const { Router } = require('express');
const serviceController = require('../controller/service.controller');

const router = Router();

router.get('/', serviceController.list);
router.post('/', serviceController.create);
router.get('/:id', serviceController.getById);
router.put('/:id', serviceController.update);
router.delete('/:id', serviceController.remove);

module.exports = router;
