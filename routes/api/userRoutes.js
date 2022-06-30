const router = require('express').Router();

const {
    getAllUsers,
    getOneUser,
    createNewUser,
  } = require('../../controllers/userController');
  
  // /api/users
  router.route('/').get(getAllUsers).post(createNewUser);
  
  // /api/users/:userId
  router.route('/:userId').get(getOneUser);
  
  module.exports = router;
  