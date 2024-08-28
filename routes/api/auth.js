const express = require("express");

const {basedir} = global;

const ctrl = require(`${basedir}/controllers/auth`);
const {ctrlWrapper} = require(`${basedir}/helpers`);
const {auth, upload} = require(`${basedir}/middlewares`);


const  router = express.Router();

router.post("/singup", ctrlWrapper(ctrl.singup));
router.post("/login", ctrlWrapper(ctrl.login));

router.get("/current", auth, ctrlWrapper(ctrl.getCurrent));

router.get("/logout", auth, ctrlWrapper(ctrl.logout));
router.patch("/users", auth, ctrlWrapper(ctrl.updateSubscription));

router.patch("/avatars", auth, upload.single("avatar"), ctrlWrapper(ctrl.setAvatar));


// router.post("/login", ctrl.login );

module.exports = router;