const express = require('express');
const Profile = require("../controllers/api-profile-controller.js");
const upload = require("../middleware/upload.js");
//const passport = require("passport");
const authMiddleware = require("../middleware/authMiddleware.js")
const router = express.Router();

router.get('/api/profile', authMiddleware, Profile.getProfile);
router.get('/api/games', authMiddleware, Profile.getUserGames);
router.post('/api/profile/avatar', authMiddleware, upload.single("avatar"), Profile.updateProfile);
// router.patch('/api/profile/create', authMiddleware, /*upload.single("avatar"),*/ Profile.updateProfile);

module.exports = router;