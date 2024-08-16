const {basedir} = global;

const {Contact} = require(`${basedir}/models/contactModel`);
const {createError} = require(`${basedir}/helpers`);


const  getAll = async (req, res, next) => {
  const {id: owner} = req.user;
  const  result = await Contact.find({owner});
  // const  result = await Contact.find({}, "name email"); що б епредати окремі поля  
  // const  result = await Contact.find({}, "-name -email"); що б Виключити   окремі поля  

   if (!result) { 
    throw createError(404);
   }
   res.json(result);
  };

module.exports = getAll;