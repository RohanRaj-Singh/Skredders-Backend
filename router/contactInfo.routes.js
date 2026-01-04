const { Router } = require('express');
const contactInfoController = require('../controller/contactInfo.controller');

const router = Router();

router.get('/', contactInfoController.list);
router.post('/', contactInfoController.create);
router.get('/:id', contactInfoController.getById);
router.put('/:id', contactInfoController.update);
router.delete('/:id', contactInfoController.remove);

module.exports = router;
