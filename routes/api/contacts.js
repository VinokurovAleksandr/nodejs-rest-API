const express = require('express');
// const Contact = require('../../models/contactModel');
// const createError = require('../../helpers/createError');

const ctrl = require('../../controllers/contacts');

const {ctrlWrapper} = require('../../helpers');


const router = express.Router()


// оброблювачі запитів 

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:id', ctrlWrapper(ctrl.getById));

router.post('/', ctrlWrapper(ctrl.postNewContact));

router.patch('/:id/favorite', ctrlWrapper(ctrl.updateFavoriteById) );

router.delete('/:id', ctrlWrapper(ctrl.deleteById));

router.put('/:id', ctrlWrapper(ctrl.updateById));

module.exports = router
