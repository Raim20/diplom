const express = require('express');
const User = require("../controllers/user/api-user-controller.js");
// const upload = require("../middleware/upload.js");
//const passport = require("passport");
const authMiddleware = require("../../middleware/authMiddleware.js")
const router = express.Router();

router.get('/api/map/user_location', authMiddleware, User.getUserLocation);
router.post('/api/map/user_location', authMiddleware, User.createUserLocation);
router.put('/api/map/user_location', authMiddleware, User.editUserLocation);
router.patch('/api/map/user_location', authMiddleware, User.editUserLocation);

router.post('/api/map/user_order', authMiddleware, User.createUserOrder);

module.exports = router;