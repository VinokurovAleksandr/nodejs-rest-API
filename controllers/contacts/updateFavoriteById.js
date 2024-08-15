const {Contact, schemas} = require('../../models/contactModel');
const {createError} = require('../../helpers');
const {contactsUpdateFavoriteSchema} = require('../../models/contactModel');


const updateFavoriteById = async (req, res, next) => {
  const {error} = contactsUpdateFavoriteSchema.validate(req.body);
    if(error) {
      throw createError(400, error.message)
    }
    const result = await Contact.findByIdAndUpdate(req.params.id, req.body, {new: true});
    if(!result) {
      throw createError(404);
    }
    res.json(result);
  };

  module.exports = updateFavoriteById;