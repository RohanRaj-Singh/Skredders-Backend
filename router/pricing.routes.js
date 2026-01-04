const { Router } = require('express');
const pricingController = require('../controller/pricing.controller');

const router = Router();

router.get('/', pricingController.list);
router.post('/', pricingController.create);
router.get('/:id', pricingController.getById);
router.put('/:id', pricingController.update);
router.delete('/:id', pricingController.remove);

module.exports = router;
