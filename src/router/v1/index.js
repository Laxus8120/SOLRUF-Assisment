const express = require('express');;

const router = express.Router();

const UserController = require('../../controller/UserController');

router.post('/signUp', UserController.create);
router.post('/signIn', UserController.signIn)
router.get('/isAuthenticated', UserController.isAuthenticated);
router.get('/getAll',UserController.getAll);
router.get('/get',UserController.getByEmail);
module.exports = router;

