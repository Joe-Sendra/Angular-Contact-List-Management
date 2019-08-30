const express = require('express');

const ContactController = require('../controllers/contacts');

// Middleware - JWT verification
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// '/api/contacts'
router.get('', ContactController.getContacts);
// '/api/contacts/:id'
router.get('/:id', ContactController.getContact);
// '/api/contacts'
router.post('', ContactController.createContact);
// '/api/contacts/:id'
router.patch('/:id', ContactController.updateContact);
// '/api/contacts/:id'
router.delete('/:id', ContactController.deleteContact);

module.exports = router;
