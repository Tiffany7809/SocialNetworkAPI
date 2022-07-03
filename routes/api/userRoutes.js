const router = require('express').Router();

const {
    getAllUsers,
    getOneUser,
    createNewUser,
    deleteUser,
    addFriend,
    deleteFriend,
    updateUser
  } = require('../../controllers/userController');
  
  // /api/users
  router
    .route('/')
    .get(getAllUsers)
    .post(createNewUser);
  
  // /api/users/:userId
  router
    .route('/:userId')
    .get(getOneUser)
    .delete(deleteUser)
    .put(updateUser);

  router
    .route('/:userId/friends/:friendId')
    .post(addFriend)
    .delete(deleteFriend)
  
  module.exports = router;
  