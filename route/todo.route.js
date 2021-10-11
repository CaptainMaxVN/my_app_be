const express = require('express');
const router = express.Router();
const todoListController = require('../controller/todolist.controller');
const jwtService = require('../service/jwt.service');

router.use(jwtService.authenticate);

router.post('/create', todoListController.createNewItem);
router.post('/list', todoListController.list);
router.post('/remove', todoListController.removeItem);
router.post('/update', todoListController.updateItem);

module.exports = router;
