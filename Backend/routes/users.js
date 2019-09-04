const express = require('express');

const UserController = require('../controllers/user');

// Middleware - JWT verification
const checkAuth = require('../middleware/check-auth');

// Middleware - Role authorization
const checkRole = require('../middleware/check-role');

const router = express.Router();

// '/api/user'
// router.get('', checkAuth, checkRole, UserController.getUsers);
router.get('', checkAuth, UserController.getUsers);

// '/api/user/:id'
// router.get('/:id', checkAuth, checkRole, UserController.getUser);
router.get('/:id', checkAuth, UserController.getUser);

// '/api/user/:id'
// router.patch('/:id', checkAuth, checkRole, UserController.updateUser);
router.patch('/:id', checkAuth, UserController.updateUser);

// '/api/user/:id'
// router.delete('/:id',checkAuth, checkRole, UserController.deleteUser);
router.delete('/:id', checkAuth, UserController.deleteUser);

// '/api/user/register'
router.post('/register', UserController.createUser);

// '/api/user/login'
router.post('/login', UserController.userLogin);

module.exports = router;
