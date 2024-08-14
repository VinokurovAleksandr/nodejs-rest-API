const {Contact} = require('../../models/contactModel');
const {createError} = require('../../helpers');



const deleteById = async (req, res, next) => {
    const result = await Contact.findByIdAndDelete(req.params.id);
      if(!result) {
        throw createError(404);
      } 
      res.json({
        message: 'Contact deleted'
      })
  };

  module.exports = deleteById;