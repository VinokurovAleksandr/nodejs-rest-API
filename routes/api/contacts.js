const express = require('express');
// const Contact = require('../../models/contactModel');
// const createError = require('../../helpers/createError');

const {basedir} = global;
const ctrl = require(`${basedir}/controllers/contacts`);

const {auth} = require(`${basedir}/middlewares`);

const {ctrlWrapper} = require(`${basedir}/helpers`);


const router = express.Router()


// оброблювачі запитів 

router.get('/', ctrlWrapper(ctrl.getAll));

router.get('/:id', ctrlWrapper(ctrl.getById));

router.post('/', auth,  ctrlWrapper(ctrl.postNewContact));

router.patch('/:id/favorite', ctrlWrapper(ctrl.updateFavoriteById) );

router.delete('/:id', ctrlWrapper(ctrl.deleteById));

router.put('/:id', ctrlWrapper(ctrl.updateById));



module.exports = router;
