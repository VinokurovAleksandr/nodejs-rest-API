const express = require('express');
// const contacts = require('../../models/contacts');
const Contact = require('../../models/contactModel');
const createError = require('../../helpers/createError');
const Joi = require("joi");



const router = express.Router()

const contactSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
})

const contactsUpdateFavoriteSchema =Joi.object({
  favorite: Joi.boolean(),
});

// оброблювачі запитів 

router.get('/', async (req, res, next) => {
  try {
    const  result = await Contact.find();
    // const  result = await Contact.find({}, "name email"); що б епредати окремі поля  
    // const  result = await Contact.find({}, "-name -email"); що б Виключити   окремі поля  

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
    const result = await Contact.findById(req.params.id);
    // const result = await Contact.findById({req.params.id});б ільш короткий метор 
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
    const result = await Contact.create(req.body);
    res.status(201).json(result);
} catch (error) {
  next(error);
}
});

router.patch('/:id/favorite', async (req, res, next) => {
  try{
    const {error} = contactsUpdateFavoriteSchema.validate(req.body);
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
});

router.delete('/:id', async (req, res, next) => {
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
});

router.put('/:id', async (req, res, next) => {
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
});

module.exports = router
