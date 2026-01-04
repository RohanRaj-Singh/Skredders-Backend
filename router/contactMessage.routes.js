const { Router } = require('express');
const contactMessageController = require('../controller/contactMessage.controller');

const router = Router();

// Public submission endpoint
router.post('/', contactMessageController.submit);

// Admin endpoints (no auth yet)
router.get('/', contactMessageController.list);
router.patch('/:id/status', contactMessageController.updateStatus);
router.delete('/:id', contactMessageController.remove);

module.exports = router;
