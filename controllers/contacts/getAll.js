const {basedir} = global;

const {Contact} = require(`${basedir}/models/contactModel`);
const {createError} = require(`${basedir}/helpers`);


const  getAll = async (req, res) => {
  const {id: owner} = req.user;
  // параметри запиту зберігаються в req.query
  const {page = 1, limit = 20} = req.query;
  const skip = (page - 1) * limit;
  const  result = await Contact.find({ owner }, "-createdAt -updatedAt", {skip, limit: Number(limit)} )
    .populate("owner", "subscription email" )
  // const  result = await Contact.find({}, "name email"); що б епредати окремі поля  
  // const  result = await Contact.find({}, "-name -email"); що б Виключити   окремі поля  

   if (!result) { 
    throw createError(404);
   }
   res.json(result);
  };

module.exports = getAll;