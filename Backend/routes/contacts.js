const express = require('express');

const ContactController = require('../controllers/contacts');

// Middleware - JWT verification
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// // '/api/contacts'
// router.get('', checkAuth, ContactController.getContacts);
// // '/api/contacts/:id'
// router.get('/:id', checkAuth, ContactController.getContact);
// // '/api/contacts'
// router.post('', checkAuth, ContactController.createContact);
// // '/api/contacts/:id'
// router.patch('/:id', checkAuth, ContactController.updateContact);
// // '/api/contacts/:id'
// router.delete('/:id', checkAuth, ContactController.deleteContact);

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
