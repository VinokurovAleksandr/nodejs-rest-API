const {Contact} = require('../../models/contactModel');
const createError = require('../../helpers/createError');


const getById = async (req, res, next) => {
    try {
      const result = await Contact.findById(req.params.id);
      // const result = await Contact.findById({req.params.id});б ільш короткий метор 
      if (!result) {
        throw createError(404);
      }
      res.json(result);
    } catch (error) {
      next(error); // Передача помилки в middleware обробник помилок
    }
  };

  module.exports = getById;