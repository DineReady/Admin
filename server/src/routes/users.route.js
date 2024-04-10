const express = require('express');
const router = express.Router();
const usersService = require('./service');

router.get('/api/users', usersService.getUsers);
router.post('/api/users', usersService.addUser);

module.exports = router;
