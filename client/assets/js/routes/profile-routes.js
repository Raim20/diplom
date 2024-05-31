const express = require('express');
const Profile = require("../controllers/profile-controller.js");

const router = express.Router();

router.get('/profile', Profile.getProfile);

module.exports = router