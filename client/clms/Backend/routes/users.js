const express = require('express');

const UserController = require('../controllers/user');

// Middleware - JWT verification
const checkAuth = require('../middleware/check-auth');

const router = express.Router();

// '/api/user'
router.get('', checkAuth, UserController.getUsers);

// '/api/user/:id'
router.get('/:id', checkAuth, UserController.getUser);

// '/api/user/:id'
router.patch('/:id', checkAuth, UserController.updateUser);

// '/api/user/:id'
router.delete('/:id',checkAuth, UserController.deleteUser);

// '/api/user/register'
router.post('/register', UserController.createUser);

// '/api/user/login'
router.post('/login', UserController.userLogin);

module.exports = router;
