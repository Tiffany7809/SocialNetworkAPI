const { Thought, User, Reaction } = require('../models');

module.exports = {
  // GET /api/thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  //GET /api/thoughts/:thoughtId
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought found!' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST /api/thoughts
  createThought(req, res) {
    Thought.create(req.body)
      .then((thought) => {
        return User.findOneAndUpdate(
          { _id: req.body.userId },
          { $addToSet: { thoughts: thought._id } },
          { new: true }
        );
      })
      .then((user) =>
        !user
          ? res.status(404).json({
              message: 'Uh oh! Somethign went wrong!',
            })
          : res.json('Thought has been posted!')
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // PUT /api/thoughts/:thoughtId
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No Thought with this id!' })
          : res.json(thought)
      )
      .catch((err) => {
        console.log(err);
        res.status(500).json(err);
      });
  },

  // DELETE /api/thoughts/:thoughtId
  deleteThought(req, res) {
    Thought.findOneAndRemove({ _id: req.params.thoughtId })
      .then((ThoughtData) =>
        !thoughtData
          ? res.status(404).json({ message: 'Nothing found with this id!' })
          : User.findOneAndUpdate(
              { thoughts: req.params.thoughtId },
              { $pull: { thoughts: req.params.thoughtId } },
              { new: true }
            )
      )
      .then((userData) =>
        !userData
          ? res.status(404).json({
              message: 'thought created but there was no user matching this id!',
            })
          : res.json({ message: 'Thought was successfully deleted!' })
      )
      .catch((err) => res.status(500).json(err));
  },

  // POST /api/thoughts/:thoughtId/reactions
  newReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $addToSet: { reactions: body } },
        { new: true, runValidators: true }
    )
    .then(ThoughtData => {
        if (!ThoughtData) {
            res.status(404).json({ message: 'No thought found with this id' });
            return;
        }
        res.json(ThoughtData);
    })
    .catch(err => res.status(500).json(err));
},

  // DELETE /api/thoughts/:thoughtId/reactions/:reactionId
deleteReaction({ params, body }, res) {
    Thought.findOneAndUpdate(
        { _id: params.thoughtId },
        { $pull: { reactions: { reactionId: body.reactionId } } },
        { new: true, runValidators: true }
    )
    .then(ThoughtData => {
        if (!ThoughtData) {
            res.status(404).json({ message: 'No thought found with this id' });
            return;
        }
        res.json({message: 'Successfully deleted the reaction'});
    })
    .catch(err => res.status(500).json(err));
},
  
};
