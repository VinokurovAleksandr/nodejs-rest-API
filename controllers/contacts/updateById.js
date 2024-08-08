const Contact = require('../../models/contactModel');
const createError = require('../../helpers/createError');
const {contactSchema} = require('./contactSchema');


const updateById = async (req, res, next) => {
    try {
      const {error} = contactSchema.validate(req.body);
      if(error) {
       throw createError(400, error.message)
      }
      const result = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});
      if(!result) {
        throw createError(404);
      }
      res.json(result);
    } catch (error){
        next(error)
    }
  };

  module.exports = updateById;