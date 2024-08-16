const express = require('express');
// const Contact = require('../../models/contactModel');
// const createError = require('../../helpers/createError');

const {basedir} = global;
const ctrl = require(`${basedir}/controllers/contacts`);

const {auth} = require(`${basedir}/middlewares`);

const {ctrlWrapper} = require(`${basedir}/helpers`);


const router = express.Router()


// оброблювачі запитів 

router.get('/', auth,ctrlWrapper(ctrl.getAll));

router.get('/:id', auth, ctrlWrapper(ctrl.getById));

router.post('/', auth,  ctrlWrapper(ctrl.postNewContact));

router.patch('/:id/favorite', auth, ctrlWrapper(ctrl.updateFavoriteById) );

router.delete('/:id', auth, ctrlWrapper(ctrl.deleteById));

router.put('/:id', auth, ctrlWrapper(ctrl.updateById));



module.exports = router;
