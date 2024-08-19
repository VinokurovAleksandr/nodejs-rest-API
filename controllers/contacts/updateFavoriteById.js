const { Contact } = require('../../models/contactModel');
const { createError } = require('../../helpers');
const { contactsUpdateFavoriteSchema } = require('../../models/contactModel');

const updateFavoriteById = async (req, res, next) => {
    // Валідація тіла запиту з використанням схеми 'contactsUpdateFavoriteSchema'
    const { error } = contactsUpdateFavoriteSchema.validate(req.body);
    if (error) {
        // Якщо валідація не пройшла, кидаємо помилку 400 Bad Request з повідомленням про помилку
        throw createError(400, error.message);
    }
    
    // Оновлення контакту за його 'id', що передається в параметрах запиту, з новими даними з тіла запиту
    const result = await Contact.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true } // Повертає оновлений документ
    );

    if (!result) {
        // Якщо контакт не знайдено, кидаємо помилку 404 Not Found
        throw createError(404);
    }
    
    // Відправлення оновленого контакту у відповіді у форматі JSON
    res.json(result);
};

module.exports = updateFavoriteById;
