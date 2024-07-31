const express = require('express');
const contacts = require('../../models/contacts');
const createError = require('../../helpers/createError');
const Joi = require("joi");



const router = express.Router()

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
})

// оброблювачі запитів 

router.get('/', async (req, res, next) => {
  try {
    const  result = await contacts.listContacts();
     if (!result) { 
      throw createError(404);
     }
     res.json(result);
  } catch (error) {
    next(error)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.id);
    if (!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error) {
    next(error); // Передача помилки в middleware обробник помилок
  }
});

router.post('/', async (req, res, next) => {
  try{
    const {error} = contactSchema.validate(req.body);
    if(error) {
      createError(400, error.message);
    }
    const result = await contacts.addContact(req.body);
    res.status(201).json(result);
} catch (error) {
  next(error);
}
});

// router.patch('/:id', async (req, res, next) => {
//   res.json({ message: 'template message' })
// });

router.delete('/:id', async (req, res, next) => {
  try{
    const result = await contacts.removeContact(req.params.id);
    if(!result) {
      throw createError(404);
    } 
    res.json({
      message: 'Contact deleted'
    })
  } catch (error){
    next(error)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const {error} = contactSchema.validate(req.body);
    if(error) {
     throw createError(400, error.message)
    }
    const result = await contacts.updateContact(req.params.id, req.body);
    if(!result) {
      throw createError(404);
    }
    res.json(result);
  } catch (error){
      next(error)
  }
});

module.exports = router
