const {Contact} = require('../../models/contactModel');
const {createError} = require('../../helpers');
const {contactSchema} = require('../../models/contactModel');


const updateById = async (req, res, next) => {
  const {error} = contactSchema.validate(req.body);
    if(error) {
    throw createError(400, error.message)
    }
    const result = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!result) {
      throw createError(404);
    }
    res.json(result);
  };

  module.exports = updateById;