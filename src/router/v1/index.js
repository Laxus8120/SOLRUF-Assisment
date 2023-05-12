const express = require('express');;

const router = express.Router();

const UserController = require('../../controller/UserController');

const  {validateAuth}  = require('../../middleware/index')

router.post('/signUp',validateAuth.validateUserAuth, UserController.create);
router.post('/signIn', validateAuth.validateUserAuth,UserController.signIn)
router.get('/isAuthenticated', UserController.isAuthenticated);
router.get('/getAll',UserController.getAll);
router.get('/get/:id',UserController.getUser);
router.delete('/user/:id', UserController.destroy);
module.exports = router;

