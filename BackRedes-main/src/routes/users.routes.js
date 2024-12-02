const express = require('express');
const { createNewUser, getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/users.controller');
const router = express.Router();

router.post('/', createNewUser);
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
