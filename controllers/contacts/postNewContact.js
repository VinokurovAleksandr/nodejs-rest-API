
const {Contact} = require('../../models/contactModel');
const {createError} = require('../../helpers');
const {contactSchema} = require('../../models/contactModel');




const postNewContact = async (req, res, next) => {
  const {error} = contactSchema.validate(req.body);
    if(error) {
      createError(400, error.message);
    }
    const result = await Contact.create(req.body);
    res.status(201).json(result);
  };

  module.exports = postNewContact;