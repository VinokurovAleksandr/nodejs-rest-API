const express = require("express");

const {basedir} = global;

const ctrl = require(`${basedir}/controllers/auth`);

const  router = express.Router();

router.post("/register", ctrl.register);

router.post("/login", ctrl.login );

module.exports = router;