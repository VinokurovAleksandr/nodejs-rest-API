const express = require("express");


const ctrl = require('../../controllers/auth');
const {ctrlWrapper} = require('../../helpers');


const  router = express.Router();

router.post("/singup", ctrlWrapper(ctrl.singup));
router.post("/login", ctrlWrapper(ctrl.login));


// router.post("/login", ctrl.login );

module.exports = router;