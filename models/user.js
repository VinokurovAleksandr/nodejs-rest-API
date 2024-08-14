const {Schema, model} = require("mongoose");
const Joi = require("joi");



const emailRegexp = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/

const userSchema = new Schema (
    {
        password: {
          type: String,
          required: [true, 'Password is required'],
        },
        email: {
          type: String,
          match: emailRegexp,
          required: [true, 'Email is required'],
          unique: true,
        },
        subscription: {
          type: String,
          enum: ["starter", "pro", "business"],
          default: "starter"
        },
        token: {
          type: String,
          default: null,
        },
        owner: {
          type: Schema.Types.ObjectId,
          ref: 'user',
        }
      }
);

const registerSchema = Joi.object({
    password: Joi.string().required(),
    email: Joi.string().pattern(emailRegexp).required(),
});

const schemas = {
    register: registerSchema,
};

const User = model('user', userSchema);

module.exports = {User, schemas};