//Require Mongoose 
const { Schema, model} = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true

        },
        email: {
            type: string,
            unique: true,
            required: true,
            match: [/^([a-z0-9./_-]+)@([a-zA-Z0-9.]+)\.([a-z0-9\.]{2,6})$/, 'Please enter a valid E-mail address.']

        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        id:false
    } 
);

const User = model("User", userSchema);

module.exports = { User };