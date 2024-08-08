const Contact = require('../../models/contactModel');
const createError = require('../../helpers/createError');



const deleteById = async (req, res, next) => {
    try{
      const result = await Contact.findByIdAndDelete(req.params.id);
      if(!result) {
        throw createError(404);
      } 
      res.json({
        message: 'Contact deleted'
      })
    } catch (error){
      next(error)
    }
  };

  module.exports = deleteById;