const express = require('express');
const Auth = require("../controllers/reg-controller.js");

const router = express.Router();

router.get('/reg/user', Auth.getReg);

router.get('/reg/driver', Auth.getRegDriver);

router.get('/', Auth.getReg);
router.get('/index', Auth.getReg);

module.exports = router;