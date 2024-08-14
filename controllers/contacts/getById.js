const {Contact} = require('../../models/contactModel');
const {createError} = require('../../helpers');


const getById = async (req, res, next) => {
  const result = await Contact.findById(req.params.id);
  // const result = await Contact.findById({req.params.id});б ільш короткий метор 
  if (!result) {
    throw createError(404);
  }
  res.json(result);
  };

  module.exports = getById;