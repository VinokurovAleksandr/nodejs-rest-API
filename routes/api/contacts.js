const express = require('express');
// const Contact = require('../../models/contactModel');
// const createError = require('../../helpers/createError');

const ctrl = require('../../controllers/contacts');

const router = express.Router()



// оброблювачі запитів 

router.get('/', ctrl.getAll );

router.get('/:id', ctrl.getById);

router.post('/', ctrl.postNewContact);

router.patch('/:id/favorite',ctrl.updateFavoriteById );

router.delete('/:id', ctrl.deleteById);

router.put('/:id', ctrl.updateById);

module.exports = router
