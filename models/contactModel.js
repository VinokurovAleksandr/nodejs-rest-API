const {Schema, model} = require("mongoose");
const Joi = require("joi");

const contactsSchema = new Schema( {
    name: {
      type: String,
      required: [true, 'Set name for contact'],
    },
    email: {
      type: String,
    },
    phone: {
      type: String,
    },
    favorite: {
      type: Boolean,
      default: false,
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    }
  }, {versionKey: false, timestamps: true});

const Contact = model('Contact', contactsSchema);

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});

const contactsUpdateFavoriteSchema =Joi.object({
  favorite: Joi.boolean(),
});



module.exports = {
  Contact,
  contactSchema,
  contactsUpdateFavoriteSchema
};