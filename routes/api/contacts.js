const express = require('express');
const contacts = require('../../models/contacts');
const createError = require('../../helpers/createError');



const router = express.Router()

// оброблювачі запитів 

router.get('/', async (req, res, next) => {
  try {
    const  result = await contacts.listContacts();
     if (result) { 
      res.json(result)
     } else {
      res.status(500).json({ message: 'Server error' })
     }
  } catch (error) {
    next(error)
  }
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.id);
    if (!result) {
      throw createError(404, 'Contact not found')
    }
    res.json(result)
  } 
  catch (error) {
    next(error); // Передача помилки в middleware обробник помилок
  }
});

router.post('/', async (req, res, next) => {
  try{
    const result = await contacts.addContact(req.body);
    if (result) {
    res.json(result);
  } else {
    res.status(404).json({ message: 'Contact not add' })
  }
} catch (error) {
  next(error)
}
});

router.patch('/:id', async (req, res, next) => {
  res.json({ message: 'template message' })
});

router.delete('/:id', async (req, res, next) => {
  try{
    const removeContact = await contacts.removeContact(req.params.id);
    if(removeContact) {
      res.json(removeContact);
    } else {
      res.status(404).json({ message: 'Contact not found'})
    }
  } catch (error){
    next(error)
  }
});

router.put('/:id', async (req, res, next) => {
  try {
    const result = await contacts.updateContact(req.params.id, req.body);
    if (result) {
      res.join(result);
    } else {
      res.status(404).join({message: "Contact not found"})
    } 
  } catch (error){
      next(error)
  }
});

module.exports = router
