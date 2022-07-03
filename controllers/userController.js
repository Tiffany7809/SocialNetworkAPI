const { User, Thought } = require('../models');

module.exports = {
  // GET /api/users
  getAllUsers(req, res) {
    User.find()
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  // GET /api/users/:userid
  getOneUser(req, res) {
    User.findOne({ _id: req.params.userId })
      .select('-__v')
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  //POST /api/users
  createNewUser(req, res) {
    User.create(req.body)
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  //DELETE /api/users/:userId
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Application.deleteMany({ _id: { $in: user.applications } })
      )
      .then(() => res.json({ message: 'User and associated apps deleted!' }))
      .catch((err) => res.status(500).json(err));
  },

  //POST /api/users/:userId/friends/:friendId
    addFriend({ params }, res) {
      User.findOneAndUpdate(
          { _id: params.userId },
          { $addToSet: { friends: params.friendId } },
          { new: true, runValidators: true }
      )
      .then(dbUserData => {
          if (!dbUserData) {
              res.status(404).json({ message: 'No user found with this userId' });
              return;
          }
      User.findOneAndUpdate(
              { _id: params.friendId },
              { $addToSet: { friends: params.userId } },
              { new: true, runValidators: true }
          )
      .then(dbUserData2 => {
              if(!dbUserData2) {
                  res.status(404).json({ message: 'No user found with that Id' })
                  return;
              }
              res.json(dbUserData);
          })
      .catch(err => res.json(err));
      })
    .catch(err => res.json(err));
  },

 // DELETE /api/users/:userId/friends/:friendId
 deleteFriend({ params }, res) {
  User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: params.friendId } },
      { new: true, runValidators: true }
  )
  .then(dbUserData => {
      if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this Id' });
          return;
      }
  User.findOneAndUpdate(
          { _id: params.friendId },
          { $pull: { friends: params.userId } },
          { new: true, runValidators: true }
      )
  .then(dbUserData2 => {
          if(!dbUserData2) {
              res.status(404).json({ message: 'No user found with this Id' })
              return;
          }
          res.json({message: 'Successfully deleted this friend'});
      })
    .catch(err => res.json(err));
  })
  .catch(err => res.json(err));
},

// PUT /api/users/:userId/friends/:friendId
updateUser({ params, body }, res) {
  User.findOneAndUpdate({ _id: params.id }, body, { new: true, runValidators: true })
  .then(dbUserData => {
      if (!dbUserData) {
          res.status(404).json({ message: 'No user found with this id' });
          return;
      }
      res.json(dbUserData);
  })
  .catch(err => res.status(400).json(err));
},


};
