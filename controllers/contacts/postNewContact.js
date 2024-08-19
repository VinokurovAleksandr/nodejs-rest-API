
const {Contact} = require('../../models/contactModel');
const {createError} = require('../../helpers');
const {contactSchema} = require('../../models/contactModel');


const postNewContact = async (req, res, next) => {
  // Валідація тіла запиту з використанням схеми 'contactSchema'
  const {error} = contactSchema.validate(req.body);
    if(error) {
       // Якщо валідація не пройшла, кидаємо помилку 400 Bad Request з повідомленням про помилку
      createError(400, error.message);
    }

     // Отримання ідентифікатора власника контакту з об'єкта 'req.user'
    const {id: owner} = req.user;

    // Створення нового контакту з даними з тіла запиту та ідентифікатором власника
    const result = await Contact.create({...req.body, owner});

    // Відправлення створеного контакту у відповіді з кодом статусу 201 (Created)
    res.status(201).json(result);
  };

  module.exports = postNewContact;