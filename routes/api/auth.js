const express = require("express");


const ctrl = require('../../controllers/auth');
const {ctrlWrapper} = require('../../helpers');
const {auth} = require('../../middlewares');


const  router = express.Router();

router.post("/singup", ctrlWrapper(ctrl.singup));
router.post("/login", ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch("/users", auth, ctrlWrapper(ctrl.updateSubscription));


// router.post("/login", ctrl.login );

module.exports = router;