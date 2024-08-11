
const Contact = require('../../models/contactModel');
const createError = require('../../helpers/createError');
const Joi = require("joi");

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
});


const postNewContact = async (req, res, next) => {
    try{
      const {error} = contactSchema.validate(req.body);
      if(error) {
        createError(400, error.message);
      }
      const result = await Contact.create(req.body);
      res.status(201).json(result);
  } catch (error) {
    next(error);
  }
  };

  module.exports = postNewContact;