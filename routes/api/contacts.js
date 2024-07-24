const express = require('express')
const contacts = require('../../models/contacts')


const router = express.Router()

// оброблювачі запитів 

router.get('/', async (req, res, next) => {
  const  result = await contacts.listContacts();
  res.json(result)
});

router.get('/:id', async (req, res, next) => {
  try {
    const result = await contacts.getContactById(req.params.id);
    if (result) {
      res.json(result);
    } else {
      res.status(404).json({ message: 'Contact not found' });
    }
  } catch (error) {
    next(error); // Передача помилки в middleware обробник помилок
  }
});

router.post('/', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.delete('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

router.put('/:contactId', async (req, res, next) => {
  res.json({ message: 'template message' })
})

module.exports = router
