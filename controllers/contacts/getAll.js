const {Contact} = require('../../models/contactModel');
const {createError} = require('../../helpers');


const  getAll = async (req, res, next) => {
  const  result = await Contact.find();
  // const  result = await Contact.find({}, "name email"); що б епредати окремі поля  
  // const  result = await Contact.find({}, "-name -email"); що б Виключити   окремі поля  

   if (!result) { 
    throw createError(404);
   }
   res.json(result);
  };

module.exports = getAll;