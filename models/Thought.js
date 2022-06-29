//Require Mongoose 
const { Schema, model} = require('mongoose');
//Require Reaction Schema
const reactionSchema = require('./Reaction');

const thoughtSchema = new Schema (
    {
        thoughtText: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 200
        },
        createdAt: {
            type: Date,
            default: Date.now,
            get: (createdAtVar) => moment(createdAtVar).format('MMM DD, YYYY [at] hh:mm a')
        },
        username: {
            type: string, 
            required: true
        },
        reactions: [reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true
        },
        id:false
    } 
);

// get total count of reactions and replies on retrieval
thoughtSchema.virtual("reactionCount").get(function () {
    return this.reactions.length;
  });

const Thought = model("Thought", thoughtSchema);

module.exports = { Thought };